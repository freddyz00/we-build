import nextConnect from "next-connect";
import multer from "multer";
import { createReadStream, unlink } from "fs";
import { sanityClient } from "../../lib/sanity";
import { slugify } from "../../lib/utils";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("image");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const file = req.file;
  const { storeSlug, ...newProduct } = req.body;

  sanityClient.assets
    .upload("image", createReadStream(file.path), {
      filename: file.originalname,
    })
    .then(async (imageAsset) => {
      unlink(file.path, () => {});
      const query = `*[_type == "store" && slug == "${storeSlug}"][0]._id`;
      const storeId = await sanityClient.fetch(query);

      // create product
      const result = await sanityClient.create({
        _type: "product",
        ...newProduct,
        price: parseFloat(newProduct.price),
        slug: { _type: "slug", current: slugify(newProduct.title) },
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: imageAsset._id },
        },
        store: { _type: "reference", _ref: storeId },
      });

      return res.status(201).json({ result });
    });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
