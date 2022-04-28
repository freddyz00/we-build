import { cloudinary } from "../../lib/cloudinary";
import { sanityClient } from "../../lib/sanity";
import { slugify } from "../../lib/utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { storeSlug, fileString, ...newProduct } = JSON.parse(req.body);
    let uploadResponse;

    // upload image to cloudinary if an image is provided
    if (fileString) {
      uploadResponse = await cloudinary.uploader.upload(fileString, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      });
    }

    // get store id
    const query = `*[_type == "store" && slug == "${storeSlug}"][0]._id`;
    const storeId = await sanityClient.fetch(query);

    // create product
    const product = {
      _type: "product",
      ...newProduct,
      price: parseFloat(newProduct.price),
      slug: { _type: "slug", current: slugify(newProduct.title) },
      store: { _type: "reference", _ref: storeId },
    };

    if (fileString) {
      product["imageId"] = uploadResponse.public_id;
    }

    const result = await sanityClient.create(product);

    return res.status(201).json({ result });
  }
  return res.status(405).json({});
}
