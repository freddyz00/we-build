import { getSession } from "next-auth/react";
import { sanityClient } from "../../lib/sanity";

export default function Store() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // check if user already has a store
  const query = `*[_type == "user" && email == "${session.user.email}"]{
      ...,
      store -> {slug}
  }`;
  const data = await sanityClient.fetch(query);

  // redirect to store editor if user has a store
  if (data[0].store) {
    return {
      redirect: {
        destination: `/store/${data[0].store.slug}/admin/editor`,
        permanent: false,
      },
    };
  }

  // redirect to create store page if user doesn't have a store
  return {
    redirect: {
      destination: "/store/create",
      permanent: false,
    },
  };
}
