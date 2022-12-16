import { UserInformation } from "~/shared/user";
import { getUserById } from "../models/user.seed";
import { getVotes } from "../models/vote.seed";

const maxInterestVotes = 4;
const maxCommitVotes = 1;

export function getUserInformation(
  userId: string
): UserInformation | undefined {
  const user = getUserById(userId);
  if (user) {
    const votes = getVotes({ user: user.id });
    return { ...user, maxCommitVotes, maxInterestVotes, votes };
  }

  return undefined;
}
