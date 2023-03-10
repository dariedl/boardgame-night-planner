import type { Boardgame as PrismaBoardgame, User } from "@prisma/client";
import type { Boardgame, Weight } from "~/shared/boardgame";
import { prisma } from "./prisma.db";

export async function getBoardgames(): Promise<Boardgame[]> {
  const boardgames = await prisma.boardgame.findMany({
    include: {
      hostedBy: true,
    },
  });
  return boardgames.map(mapToBoardgame);
}

export async function getBoardgame(
  boardgameId: string
): Promise<Boardgame | null> {
  const boardgame = await prisma.boardgame.findUnique({
    where: {
      id: boardgameId,
    },
    include: { hostedBy: true },
  });
  if (!boardgame) {
    return null;
  }
  return mapToBoardgame(boardgame);
}

export async function updateHost(
  boardgameId: string,
  userId: string | null
): Promise<Boardgame> {
  const boardgame = await prisma.boardgame.update({
    where: {
      id: boardgameId,
    },
    data: {
      hostedById: userId,
    },
    include: { hostedBy: true },
  });
  return mapToBoardgame(boardgame);
}

export function mapToBoardgame(
  boardgame: PrismaBoardgame & {
    hostedBy: User | null;
  }
): Boardgame {
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
    description: boardgame.description ?? undefined,
    urlLink: boardgame.urlLink ?? undefined,
    hostedBy: boardgame.hostedBy ?? undefined,
    weight: weight,
  };
}
