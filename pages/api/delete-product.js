import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { productId } = JSON.parse(req.body);

    const query = `*[_type == "product" && _id == "${productId}"][0]`;
    const product = await sanityClient.fetch(query);

    sanityClient.delete(product._id).then(() => {
      sanityClient.delete(product.image.asset._ref);
    });
    return res.status(200).json({});
  }
  return res.status(405).json({});
}
