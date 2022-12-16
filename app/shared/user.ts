import { Vote } from "./vote";

export interface User {
  id: string;
  name: string;
}

export interface UserInformation extends User {
  maxInterestVotes: number;
  maxCommitVotes: number;
  votes: Vote[];
}
