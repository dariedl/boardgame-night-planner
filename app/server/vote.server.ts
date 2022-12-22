import type { VoteType } from "~/shared/vote";
import { voteOnBoardgame as vote } from "./services/vote.service";

export function voteOnBoardgame(
  userId: string,
  boardgameId: string,
  type: VoteType
): void {
  vote(userId, boardgameId, type);
}
