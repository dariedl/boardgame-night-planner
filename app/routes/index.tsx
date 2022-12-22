import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BoardgameItem } from "~/components/BoardgameItem";
import { getBoardgameList } from "~/server/boardgame.server";
import { getUser } from "~/server/user.server";
import { voteOnBoardgame } from "~/server/vote.server";

type LoaderData = {
  boardgames: Awaited<ReturnType<typeof getBoardgameList>>;
  user: Awaited<ReturnType<typeof getUser>>;
};
const userId = "1";

export async function action({ request }) {
  const form = await request.formData();
  const type = form.get("voteType");
  const [voteType, boardgameId] = type.split("-");
  console.log(111, userId, boardgameId, voteType);
  await voteOnBoardgame(userId, boardgameId, voteType);
  return null;
}

export const loader = async () => {
  return json<LoaderData>({
    boardgames: await getBoardgameList(),
    user: await getUser(userId),
  });
};

export default function Index() {
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
