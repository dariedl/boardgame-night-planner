import type { BoardgameWithVotes } from "~/shared/boardgame";
import {
  getBoardgame,
  getBoardgames,
  updateHost,
} from "../repository/boardgame.repository";
import {
  getVotes,
  removeVotesByBoardgameId,
} from "../repository/vote.repository";
import { getUserWithVotes } from "./user.service";

export async function getBoardgameWithVotes(
  boardgameId: string
): Promise<BoardgameWithVotes | undefined> {
  const boardgame = await getBoardgame(boardgameId);
  if (!boardgame) {
    return undefined;
  }
  const votes = await getVotes({ boardgameId });
  const votesWithNames = [];
  for (const vote of votes) {
    const user = await getUserWithVotes(vote.userId);
    votesWithNames.push({ ...vote, userName: user.name });
  }
  return { ...boardgame, votes: votesWithNames };
}

export async function getBoardgamesWithVotes() {
  const boardgames = await getBoardgames();
  const boardGamesWithVotes = [];

  for (const boardgame of boardgames) {
    const votes = await getVotes({ boardgameId: boardgame.id });
    const votesWithNames = [];

    for (const vote of votes) {
      const user = await getUserWithVotes(vote.userId);
      votesWithNames.push({ ...vote, userName: user.name });
    }

    boardGamesWithVotes.push({ ...boardgame, votes: votesWithNames });
  }

  return boardGamesWithVotes;
}

export async function hostBoardgame(
  boardgameId: string,
  userId: string
): Promise<void> {
  const boardgame = await getBoardgame(boardgameId);
  if (!boardgame) {
    throw new Error("Boardgame not found");
  } else if (boardgame.hostedBy && boardgame.hostedBy.id !== userId) {
    throw new Error("Cannot host another persons boardgame");
  } else if (boardgame.hostedBy && boardgame.hostedBy.id === userId) {
    await updateHost(boardgameId, null);
    await removeVotesByBoardgameId(boardgameId);
  } else {
    await updateHost(boardgameId, userId);
  }
}
