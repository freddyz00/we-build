import nextConnect from "next-connect";
import multer from "multer";
import { getSession } from "next-auth/react";
import { createReadStream } from "fs";
import { sanityClient } from "../../lib/sanity";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("file");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const file = req.file;
  const { user } = await getSession({ req });
  const { _id: userId } = await sanityClient.fetch(
    `*[_type == "user" && email == "${user.email}"][0]{_id}`
  );

  sanityClient.assets
    .upload("image", createReadStream(file.path), {
      filename: file.originalname,
    })
    .then((imageAsset) => {
      return sanityClient
        .patch(userId)
        .setIfMissing({ pageImages: [] })
        .insert("after", "pageImages[-1]", [
          {
            _type: "image",
            asset: { _type: "reference", _ref: imageAsset._id },
          },
        ])
        .commit({
          autoGenerateArrayKeys: true,
        });
    })
    .then(() => {
      res.status(200).json({});
    })
    .catch((error) => console.log(error));
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
