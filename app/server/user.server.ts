import type { UserInformation } from "~/shared/user";
import { getUserWithVotes } from "./services/user.service";

export async function getUserInformation(
  userId: string
): Promise<UserInformation> {
  return getUserWithVotes(userId);
}
