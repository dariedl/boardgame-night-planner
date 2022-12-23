import type { UserInformation } from "~/shared/user";
import { getUserById, getUserByName } from "../repository/user.repository";
import { getVotes } from "../repository/vote.repository";

const maxInterestVotes = 4;
const maxCommitVotes = 1;

export async function getUserInformation(
  userId: string
): Promise<UserInformation> {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("No User with the Id found");
  }
  const votes = await getVotes({ userId });
  return { ...user, maxCommitVotes, maxInterestVotes, votes };
}

export async function getAuthenticatedUser(name: string, password: string) {
  const user = await getUserByName(name, password);
  if (!user) {
    throw new Error("No User found");
  }
  const votes = await getVotes({ userId: user.id });
  return { ...user, maxCommitVotes, maxInterestVotes, votes };
}
