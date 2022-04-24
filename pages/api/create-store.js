import { sanityClient } from "../../lib/sanity";
import { getSession } from "next-auth/react";
import { defaultData } from "../../lib/defaultData";
import { nanoid } from "nanoid";

const defaultSections = [
  "header",
  "imageBanner",
  "about",
  "imageWithText",
  "footer",
];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const { storeName } = JSON.parse(req.body);

    // check if user already has a store
    const userQuery = `*[_type == "user" && email == "${session.user.email}"]`;
    const userData = await sanityClient.fetch(userQuery);

    if (userData[0].store) {
      return res.status(409).json({ message: `You already have a store` });
    }

    // check if storeName exists
    const storeNameQuery = `*[_type == "store" && name == "${storeName}"]`;
    const storeNameData = await sanityClient.fetch(storeNameQuery);

    if (storeNameData.length > 0) {
      return res
        .status(409)
        .json({ message: `Store with the name "${storeName}" already exists` });
    }

    // create default page
    const page = {
      _type: "page",
      page: "Home",
      sections: defaultSections.map((section) => {
        if (section === "header") {
          return {
            _key: nanoid(),
            ...defaultData.header,
            brandName: storeName,
          };
        }
        return { _key: nanoid(), ...defaultData[section] };
      }),
    };

    const pageResult = await sanityClient.create(page);

    // create store
    const store = {
      _type: "store",
      name: storeName,
      slug: storeName.toLowerCase().replace(/\s/g, "-"),
      owner: {
        _type: "reference",
        _ref: userData[0]._id,
      },
      page: {
        _type: "reference",
        _ref: pageResult._id,
      },
    };

    const storeResult = await sanityClient.create(store);

    // update user
    const updateUserResult = await sanityClient
      .patch(userData[0]._id)
      .set({ store: { _type: "reference", _ref: storeResult._id } })
      .commit();

    return res.status(201).json({ slug: storeResult.slug });
  }
  return res.status(403).json({});
}
