import type { VoteType } from "~/shared/vote";
import { canVoteOnGame } from "~/shared/vote";
import { addVote, removeVote } from "../repository/vote.repository";
import { getBoardgameWithVotes } from "./boardgame.service";
import { getUserInformation } from "./user.service";

export async function voteOnBoardgame(
  userId: string,
  boardgameId: string,
  type: VoteType
) {
  const user = await getUserInformation(userId);
  const boardgame = await getBoardgameWithVotes(boardgameId);
  if (!boardgame) {
    return;
  }
  const canVote = canVoteOnGame(user, boardgame, type);

  if (canVote === "CannotVote") {
    return;
  } else if (canVote === "CanAddVote") {
    await addVote(userId, boardgameId, type);
  } else if (canVote === "CanReplaceVote") {
    await removeVote(userId, boardgameId);
    await addVote(userId, boardgameId, type);
  }
  return;
}
