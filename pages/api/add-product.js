import { nanoid } from "nanoid";
import { sanityClient } from "../../lib/sanity";
import { slugify } from "../../lib/utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { storeSlug, ...newProduct } = JSON.parse(req.body);
    const query = `*[_type == "store" && slug == "${storeSlug}"][0]._id`;
    const storeId = await sanityClient.fetch(query);

    // create product
    const result = await sanityClient.create({
      _type: "product",
      ...newProduct,
      price: parseFloat(newProduct.price),
      slug: { _type: "slug", current: slugify(newProduct.title) },
      store: { _type: "reference", _ref: storeId },
    });

    // update store
    await sanityClient
      .patch(storeId)
      //   .set({ products: [] })
      .setIfMissing({ products: [] })
      .append("products", [
        { _key: nanoid(), _type: "reference", _ref: result._id },
      ])
      .commit();

    return res.status(201).json({ result });
  }
  return res.status(403).json({});
}
