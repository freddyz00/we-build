import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(await req.body);
    const { pageId, sections } = data;

    sanityClient
      .patch(pageId)
      .set({ sections })
      .commit()
      .then(() => console.log("updated"))
      .catch((error) => console.log(error));

    // await sanityClient.patch(pageId, [{ set: { sections: newSections } }]);
    // res.status(200).json({});
  }
  res.status(200).json({});
}
