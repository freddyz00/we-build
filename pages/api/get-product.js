import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  const { storeSlug, productSlug } = req.query;
  console.log("store slug", storeSlug);
  console.log("product slug", productSlug);
  const query = `*[_type == "store" && slug=="${storeSlug}"][0]{
    "product": *[_type =="product" && references(^._id) && slug.current == "${productSlug}"]
  }`;
  const data = await sanityClient.fetch(query);
  res.status(200).json(data.product);
}
