import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BoardgameItem } from "~/components/BoardgameItem";
import { getBoardgameList } from "~/server/boardgame.server";

type LoaderData = {
  boardgames: Awaited<ReturnType<typeof getBoardgameList>>;
};

export const loader = async () => {
  return json<LoaderData>({
    boardgames: await getBoardgameList(),
  });
};

export default function Index() {
  const { boardgames } = useLoaderData() as LoaderData;
  return (
    <main>
      <ul>
        {boardgames.map((boardgame) => (
          <li key={boardgame.title}>
            <BoardgameItem boardgame={boardgame} />
          </li>
        ))}
      </ul>
    </main>
  );
}
