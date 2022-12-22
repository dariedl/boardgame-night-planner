import type { Boardgame, Weight } from "~/shared/boardgame";
import type { Boardgame as PrismaBoardgame } from "@prisma/client";
import prisma from "../db.server";

export async function getBoardgames(): Promise<Boardgame[]> {
  const boardgames = await prisma.boardgame.findMany({});
  return boardgames.map(mapToBoardgame);
}

export async function getBoardgame(
  boardgameId: string
): Promise<Boardgame | undefined> {
  const boardgame = await prisma.boardgame.findUnique({
    where: {
      id: boardgameId,
    },
  });
  if (!boardgame) {
    return undefined;
  }
  return mapToBoardgame(boardgame);
}

export function mapToBoardgame(boardgame: PrismaBoardgame): Boardgame {
  const weight: Weight =
    boardgame.weight === "heavy"
      ? "heavy"
      : boardgame.weight === "midweight"
      ? "midweight"
      : boardgame.weight === "light"
      ? "light"
      : "undefined";

  return {
    ...boardgame,
    weight: weight,
  };
}
