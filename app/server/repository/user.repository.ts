import type { User } from "~/shared/user";
import { prisma } from "./prisma.db";

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

export async function getUserByName(name: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  if (!user) {
    return undefined;
  }
  return user;
}
