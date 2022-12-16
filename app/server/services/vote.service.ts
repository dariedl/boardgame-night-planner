import { UserInformation } from "~/shared/user";
import { canVoteOnGame, VoteType } from "~/shared/vote";
import { addVote, getVote, removeVote } from "../models/vote.seed";
import { getBoardgameWithVotes } from "./boardgame.service";
import { getUserInformation } from "./user.service";

export function voteOnBoardgame(
  userId: string,
  boardgameId: string,
  type: VoteType
) {
  const user = getUserInformation(userId);
  const boardgame = getBoardgameWithVotes(boardgameId);
  if (!user || !boardgame) {
    return;
  }
  const canVote = canVoteOnGame(user, boardgame, type);

  if (canVote === "CannotVote") {
    return;
  } else if (canVote === "CanAddVote") {
    addVote(userId, boardgameId, type);
  } else if (canVote === "CanReplaceVote") {
    removeVote(userId, boardgameId);
    addVote(userId, boardgameId, type);
  }
  return;
}
