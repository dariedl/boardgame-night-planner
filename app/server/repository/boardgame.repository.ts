import type { Boardgame as PrismaBoardgame } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { Boardgame, Weight } from "~/shared/boardgame";

const prisma = new PrismaClient();

export async function getBoardgames(): Promise<Boardgame[]> {
  const boardgames = await prisma.boardgame.findMany({});
  return boardgames.map(mapToBoardgame);
}

export async function getBoardgame(
  boardgameId: string
): Promise<Boardgame | null> {
  const boardgame = await prisma.boardgame.findUnique({
    where: {
      id: boardgameId,
    },
  });
  if (!boardgame) {
    return null;
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
