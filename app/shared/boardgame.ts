import { Vote } from "./vote";

type Weight = "light" | "midweight" | "heavy";

export interface Boardgame {
  id: string;
  title: string;
  urlLink?: string;
  description?: string;
  minPlayers: number;
  maxPlayers: number;
  weight: Weight;
}

export interface BoardgameWithVotes extends Boardgame {
  votes: Vote[];
}
