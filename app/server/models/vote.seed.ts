import type { Vote, VoteType } from "../../shared/vote";

const votes: Array<Vote> = [
  {
    userId: "1",
    boardgameId: "3",
    type: "interest",
  },
  {
    userId: "1",
    boardgameId: "1",
    type: "interest",
  },
  {
    userId: "2",
    boardgameId: "3",
    type: "commit",
  },
  {
    userId: "3",
    boardgameId: "4",
    type: "interest",
  },
  {
    userId: "3",
    boardgameId: "3",
    type: "commit",
  },
];

type VoteFilter = {
  boardgame?: string;
  user?: string;
};

export function getVote(userId: string, boardgame: string): Vote | undefined {
  let result = votes;
  result = result.filter((vote) => vote.boardgameId === boardgame);
  result = result.filter((vote) => vote.userId === userId);
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export function getVotes(filters?: VoteFilter): Array<Vote> {
  let result = votes;
  if (filters?.boardgame) {
    result = result.filter((vote) => vote.boardgameId === filters.boardgame);
  }
  if (filters?.user) {
    result = result.filter((vote) => vote.userId === filters.user);
  }
  return result;
}

export function addVote(userId: string, boardgameId: string, type: VoteType) {
  votes.push({ userId, boardgameId, type });
}

export function removeVote(userId: string, boardgameId: string) {
  const index = votes.findIndex(
    (vote) => vote.userId === userId && vote.boardgameId === boardgameId
  );

  if (index > -1) {
    votes.splice(index, 1);
  }
}
