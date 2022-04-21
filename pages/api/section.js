// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from "../../lib/sanity";
import { defaultData } from "../../lib/defaultdata";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const doc = defaultData[data.type];

    sanityClient
      .patch(data.pageId)
      .insert("after", "sections[-2]", [doc])
      .commit({
        autoGenerateArrayKeys: true,
      })
      .then(() => {
        res.status(200).json({});
      });
  }
}
