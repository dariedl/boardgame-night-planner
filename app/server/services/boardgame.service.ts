import { BoardgameWithVotes } from "~/shared/boardgame";
import { getBoardgame, getBoardgames } from "../models/boardgame.seed";
import { getVotes } from "../models/vote.seed";

export function getBoardgameWithVotes(
  boardgameId: string
): BoardgameWithVotes | undefined {
  const boardgame = getBoardgame(boardgameId);
  if (!boardgame) {
    return undefined;
  }
  const votes = getVotes({ boardgame: boardgameId });
  return { ...boardgame, votes };
}

export function getBoardgamesWithVotes() {
  const boardgames = getBoardgames();

  return boardgames.map((boardgame) => {
    const votes = getVotes({ boardgame: boardgame.id });
    return { ...boardgame, votes };
  });
}
