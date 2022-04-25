import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  const { storeSlug } = req.query;
  const query = `*[_type == "store" && slug=="${storeSlug}"][0]{
      products[] ->
  }`;
  const data = await sanityClient.fetch(query);
  res.status(200).json(data.products);
}
