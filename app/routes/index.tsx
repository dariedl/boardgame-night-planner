import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/server/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
    successRedirect: "/boardgames",
  });
};

export async function action({ request }: ActionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/boardgames",
    failureRedirect: "/login",
  });
}

export default function Index() {
  return <Link to="/boardgames">Boardgames</Link>;
}
