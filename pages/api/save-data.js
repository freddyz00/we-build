import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(await req.body);
    const { pageId, sections } = data;

    await sanityClient
      .patch(pageId)
      .set({ sections })
      .commit()
      .catch((error) => console.log(error));
    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}
