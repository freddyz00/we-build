import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  const slug = req.query.slug;
  const query = `*[_type == "store" && slug == "${slug}"][0]{
    page ->,
    name
  }`;
  const data = await sanityClient.fetch(query);
  res.status(200).json(data);
}
