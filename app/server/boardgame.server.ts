import type { BoardgameWithVotes } from "~/shared/boardgame";
import { getBoardgamesWithVotes } from "./services/boardgame.service";

export async function getBoardgameList(): Promise<BoardgameWithVotes[]> {
  return getBoardgamesWithVotes();
}
