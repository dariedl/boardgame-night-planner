import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useCatch } from "@remix-run/react";
import { authenticator } from "~/server/auth/auth.server";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy

interface LoginProps {
  incorrectCredentials?: boolean;
}

export default function Login({ incorrectCredentials }: LoginProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <Form method="post">
          <div className="mt-4">
            <div>
              <label className="block">Username</label>
              <input
                type="username"
                name="username"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
              {/* <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a> */}
            </div>
            {incorrectCredentials && (
              <div className="text-red-500">Incorrect Credentials</div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  const user = await authenticator.authenticate("form", request, {
    successRedirect: "/",
  });

  // if (!user) {
  //   throw new Error("Wrong Credentials");
  // }

  return user;
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <Login incorrectCredentials={true}></Login>
    </div>
  );
}
