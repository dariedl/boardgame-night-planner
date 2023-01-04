import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BoardgameItem } from "~/components/BoardgameItem";
import { authenticator } from "~/server/auth/auth.server";
import { getBoardgameList } from "~/server/boardgame.server";
import { hostBoardgame } from "~/server/services/boardgame.service";
import { getUserInformation } from "~/server/user.server";
import { voteOnBoardgame } from "~/server/vote.server";

type LoaderData = {
  boardgames: Awaited<ReturnType<typeof getBoardgameList>>;
  user: Awaited<ReturnType<typeof getUserInformation>>;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const commitValue = form.get("commitBtn");
  const interestValue = form.get("interestBtn");
  const hostAddValue = form.get("hostAddBtn");
  const hostRemoveValue = form.get("hostRemoveBtn");
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (commitValue) {
    const boardgameId = commitValue.toString();
    await voteOnBoardgame(authUser.id, boardgameId, "commit");
  } else if (interestValue) {
    const boardgameId = interestValue.toString();
    await voteOnBoardgame(authUser.id, boardgameId, "interest");
  } else if (hostAddValue) {
    const boardgameId = hostAddValue.toString();
    await hostBoardgame(boardgameId, authUser.id);
  } else if (hostRemoveValue) {
    const boardgameId = hostRemoveValue.toString();
    await hostBoardgame(boardgameId, authUser.id);
  }
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({
    boardgames: await getBoardgameList(),
    user: await getUserInformation(authUser.id),
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
