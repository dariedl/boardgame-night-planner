import { prisma } from "./prisma.db";
import type { Vote as PrismaVote } from "@prisma/client";
import type { Vote, VoteType } from "~/shared/vote";
import { mapStringToVoteType } from "~/shared/vote";

export async function getVote(
  userId: string,
  boardgameId: string
): Promise<Vote | null> {
  const vote = await prisma.vote.findUnique({
    where: {
      userId_boardgameId: {
        userId,
        boardgameId,
      },
    },
  });

  if (!vote) {
    return null;
  }

  return mapToVote(vote);
}

type VoteFilter = {
  boardgameId?: string;
  userId?: string;
};

export async function getVotes(filters?: VoteFilter) {
  const votes = await prisma.vote.findMany({
    where: {
      userId: {
        contains: filters?.userId,
      },
      boardgameId: {
        contains: filters?.boardgameId,
      },
    },
  });

  return votes.map(mapToVote);
}

export async function addVote(
  userId: string,
  boardgameId: string,
  type: VoteType
): Promise<Vote> {
  return mapToVote(
    await prisma.vote.create({ data: { userId, boardgameId, type } })
  );
}

export async function removeVote(
  userId: string,
  boardgameId: string
): Promise<Vote> {
  const deletedVote = await prisma.vote.delete({
    where: {
      userId_boardgameId: {
        userId,
        boardgameId,
      },
    },
  });

  return mapToVote(deletedVote);
}

export async function removeVotesByBoardgameId(
  boardgameId: string
): Promise<void> {
  await prisma.vote.deleteMany({
    where: {
      boardgameId,
    },
  });
}

function mapToVote(vote: PrismaVote): Vote {
  return { ...vote, type: mapStringToVoteType(vote.type) };
}
