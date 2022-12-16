import { getUserInformation } from "~/server/services/user.service";
import { BoardgameWithVotes } from "./boardgame";
import { UserInformation } from "./user";

export type VoteType = "interest" | "commit";

export interface Vote {
  userId: string;
  boardgameId: string;
  type: VoteType;
}

export type CanVoteResult = "CannotVote" | "CanAddVote" | "CanReplaceVote";

export function canVoteOnGame(
  user: UserInformation,
  boardgame: BoardgameWithVotes,
  type: VoteType
): CanVoteResult {
  const currentVote = boardgame.votes.find((vote) => vote.userId === user.id);
  const canCommit = hasCommitVotes(user, type);
  const canInterest = hasInterestVotes(user, type);

  if (currentVote && currentVote.type === type) {
    return "CannotVote";
  } else if (currentVote && type === "commit" && canCommit) {
    return "CanReplaceVote";
  } else if (currentVote && type === "interest" && canInterest) {
    return "CanReplaceVote";
  } else if (!currentVote && type === "commit" && canCommit) {
    return "CanAddVote";
  } else if (!currentVote && type === "interest" && canInterest) {
    return "CanAddVote";
  }
  return "CannotVote";
}

export function hasCommitVotes(user: UserInformation, type: VoteType) {
  const commitVotes = user.votes.filter((vote) => vote.type === "commit");
  if (type === "commit" && commitVotes.length >= user.maxCommitVotes) {
    return false;
  }
  return true;
}

export function hasInterestVotes(user: UserInformation, type: VoteType) {
  const interestVotes = user.votes.filter((vote) => vote.type === "interest");
  if (type === "interest" && interestVotes.length >= user.maxInterestVotes) {
    return false;
  }
  return true;
}
