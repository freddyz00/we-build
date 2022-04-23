import { sanityClient } from "../../lib/sanity";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { user } = await getSession({ req });

  const query = `*[_type == "user" && email == "${user.email}"][0]{
    "page": *[_type == "page" && references(^._id)][0]
  }`;
  const data = await sanityClient.fetch(query);
  res.status(200).json(data);
}
