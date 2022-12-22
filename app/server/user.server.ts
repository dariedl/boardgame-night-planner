import type { UserInformation } from "~/shared/user";
import { getUserInformation } from "./services/user.service";

export async function getUser(userId: string): Promise<UserInformation> {
  return getUserInformation(userId);
}
