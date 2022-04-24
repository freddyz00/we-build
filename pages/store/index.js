import { getSession } from "next-auth/react";
import { sanityClient } from "../../lib/sanity";

export default function Store() {
  return <div>Hello store</div>;
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

  const query = `*[_type == "user" && email == "${session.user.email}"]{
      ...,
      store -> {slug}
  }`;
  const data = await sanityClient.fetch(query);

  if (data[0].store) {
    return {
      redirect: {
        destination: `/store/${data[0].store.slug}/editor`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/store/create",
      permanent: false,
    },
  };
}
