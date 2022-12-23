import type { BoardgameWithVotes } from "~/shared/boardgame";
import type { VoteWithName } from "~/shared/vote";
import {
  getBoardgame,
  getBoardgames,
} from "../repository/boardgame.repository";
import { getVotes } from "../repository/vote.repository";
import { getUserWithVotes } from "./user.service";

export async function getBoardgameWithVotes(
  boardgameId: string
): Promise<BoardgameWithVotes | undefined> {
  const boardgame = await getBoardgame(boardgameId);
  if (!boardgame) {
    return undefined;
  }
  const votes = await getVotes({ boardgameId });
  const votesWithNames: VoteWithName[] = votes.map((vote) => {
    const user = getUserWithVotes(vote.userId);
    return { ...vote, userName: user?.name };
  });
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
      votesWithNames.push({ ...vote, userName: user?.name });
    }

    boardGamesWithVotes.push({ ...boardgame, votes: votesWithNames });
  }

  return boardGamesWithVotes;
}
