import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BoardgameItem } from "~/components/BoardgameItem";
import { authenticator } from "~/server/auth.server";
import { getBoardgameList } from "~/server/boardgame.server";
import type { getUser } from "~/server/user.server";
import { voteOnBoardgame } from "~/server/vote.server";

type LoaderData = {
  boardgames: Awaited<ReturnType<typeof getBoardgameList>>;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const type = form.get("voteType")!.toString();
  const [voteType, boardgameId] = type.split("-");
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  await voteOnBoardgame(user?.id, boardgameId, voteType);
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({
    boardgames: await getBoardgameList(),
    user: user,
  });
};

export default function Boardgames() {
  const { boardgames, user } = useLoaderData() as LoaderData;
  const interestVotes =
    user.votes.filter((vote) => vote.type === "interest") ?? [];
  const commitVotes = user.votes.filter((vote) => vote.type === "commit") ?? [];
  return (
    <main>
      <div className="flex flex-col">
        <span>Name: {user?.name} </span>
        <span>
          Interest Votes: {interestVotes.length}/{user?.maxInterestVotes}
        </span>
        <span>
          Commit Votes: {commitVotes.length}/{user?.maxCommitVotes}
        </span>
      </div>
      <ul>
        {boardgames.map((boardgame) => (
          <li key={boardgame.title}>
            <BoardgameItem boardgame={boardgame} user={user} />
          </li>
        ))}
      </ul>
    </main>
  );
}
