import type { User } from "../../shared/user";

const users: Array<User> = [
  {
    id: "1",
    name: "Thea Reiss",
  },
  {
    id: "2",
    name: "Celine Häusler",
  },
  {
    id: "3",
    name: "Philip Appelt",
  },
  {
    id: "4",
    name: "Jörn Hansen",
  },
  {
    id: "5",
    name: "Olga Kuhnt",
  },
  {
    id: "6",
    name: "Mark Hitzig",
  },
  {
    id: "7",
    name: "Mika Schult",
  },
];

export function getUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

export function getUsers(): Array<User> {
  return users;
}
