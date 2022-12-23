import type { User } from "./user";
import type { VoteWithName } from "./vote";

export type Weight = "light" | "midweight" | "heavy" | "undefined";

export interface Boardgame {
  id: string;
  title: string;
  hostedBy?: User | null;
  urlLink?: string | null;
  description?: string | null;
  minPlayers: number;
  maxPlayers: number;
  weight: Weight;
}

export interface BoardgameWithVotes extends Boardgame {
  votes: VoteWithName[];
}
