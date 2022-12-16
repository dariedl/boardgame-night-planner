import { UserInformation } from "~/shared/user";
import { getUserInformation } from "./services/user.service";

export function getUser(userId: string): UserInformation | undefined {
  return getUserInformation(userId);
}
