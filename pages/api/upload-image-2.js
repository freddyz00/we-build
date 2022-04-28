import { getSession } from "next-auth/react";
import { cloudinary } from "../../lib/cloudinary";
import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // upload image to cloudinary
    const { fileString } = JSON.parse(req.body);
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    // get user id
    const { user } = await getSession({ req });
    const { _id: userId } = await sanityClient.fetch(
      `*[_type == "user" && email == "${user.email}"][0]{_id}`
    );

    // update user in sanity
    await sanityClient
      .patch(userId)
      .setIfMissing({ pageImages: [] })
      .append("pageImages", [uploadResponse.public_id])
      .commit({ autoGenerateArrayKeys: true });

    return res.status(200).json({});
  }

  res.status(405).json({});
}
