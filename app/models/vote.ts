type VoteType = "interest" | "commit";

export interface Vote {
  userId: string;
  boardgameId: string;
  type: VoteType;
}
