import type { BoardgameWithVotes } from "~/shared/boardgame";
import { getBoardgamesWithVotes } from "./services/boardgame.service";

export function getBoardgameList(): BoardgameWithVotes[] {
  return getBoardgamesWithVotes();
}
