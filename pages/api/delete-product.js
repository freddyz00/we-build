import { sanityClient } from "../../lib/sanity";
import { cloudinary } from "../../lib/cloudinary";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { productId, imageId } = JSON.parse(req.body);

    await sanityClient.delete(productId);
    await cloudinary.api.delete_resources([imageId]);

    return res.status(200).json({});
  }
  return res.status(405).json({});
}
