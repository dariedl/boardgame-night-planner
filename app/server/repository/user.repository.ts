import { prisma } from "./prisma.db";
import type { User } from "~/shared/user";

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({});
}

export async function getUserById(userId: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return undefined;
  }
  return user;
}
