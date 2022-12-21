import { BoardgameWithVotes } from "~/shared/boardgame";
import { VoteWithName } from "~/shared/vote";
import { getBoardgame, getBoardgames } from "../models/boardgame.seed";
import { getVotes } from "../models/vote.seed";
import { getUserInformation } from "./user.service";

export function getBoardgameWithVotes(
  boardgameId: string
): BoardgameWithVotes | undefined {
  const boardgame = getBoardgame(boardgameId);
  if (!boardgame) {
    return undefined;
  }
  const votes = getVotes({ boardgame: boardgameId });
  const votesWithNames: VoteWithName[] = votes.map((vote) => {
    const user = getUserInformation(vote.userId);
    return { ...vote, userName: user?.name };
  });
  return { ...boardgame, votes: votesWithNames };
}

export function getBoardgamesWithVotes() {
  const boardgames = getBoardgames();

  return boardgames.map((boardgame) => {
    const votes = getVotes({ boardgame: boardgame.id });
    const votesWithNames: VoteWithName[] = votes.map((vote) => {
      const user = getUserInformation(vote.userId);
      return { ...vote, userName: user?.name };
    });
    return { ...boardgame, votes: votesWithNames };
  });
}
