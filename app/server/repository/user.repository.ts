import type { User } from "~/shared/user";
import { prisma } from "./prisma.db";
import bcrypt from "bcrypt";

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
  return exclude({ user, keys: ["hashedPassword"] });
}

export async function getAuthUserByNameAndPassword(
  name: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (!user) {
    return null;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!isCorrectPassword) {
    return null;
  }
  return exclude({ user, keys: ["hashedPassword"] });
}

function exclude<T, Key extends keyof T>({
  user,
  keys,
}: {
  user: T;
  keys: Key[];
}): Omit<T, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
