import type { VoteType } from "~/shared/vote";
import { voteOnBoardgame as vote } from "./services/vote.service";

export async function voteOnBoardgame(
  userId: string,
  boardgameId: string,
  type: VoteType
): Promise<void> {
  await vote(userId, boardgameId, type);
}
