import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/server/auth/auth.server";

export async function loader({ request }: LoaderArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
