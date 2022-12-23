import type { VoteType } from "~/shared/vote";
import { checkVoteStatus } from "~/shared/vote";
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
  const canVote = checkVoteStatus(user, boardgame, type);

  if (canVote === "AddVote") {
    await addVote(userId, boardgameId, type);
  } else if (canVote === "RemoveVote") {
    await removeVote(userId, boardgameId);
  } else if (canVote === "ReplaceVote") {
    await removeVote(userId, boardgameId);
    await addVote(userId, boardgameId, type);
  }
  return;
}
