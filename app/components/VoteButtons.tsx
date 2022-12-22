import { Form } from "@remix-run/react";
import { FaRegLightbulb, FaRegThumbsUp } from "react-icons/fa";
import type { BoardgameWithVotes } from "~/shared/boardgame";
import type { UserInformation } from "~/shared/user";
import { canVoteOnGame } from "~/shared/vote";

interface VoteButtonProps {
  boardgame: BoardgameWithVotes;
  user: UserInformation;
}
export const VoteButtons = ({ user, boardgame }: VoteButtonProps) => {
  return (
    <Form className="flex w-max flex-col justify-center" method="post">
      <button
        type="submit"
        name="voteType"
        value={`commit-${boardgame.id}`}
        className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-green-500 disabled:opacity-25"
        disabled={canVoteOnGame(user, boardgame, "commit") === "CannotVote"}
      >
        <FaRegThumbsUp className="h-10 w-10" />
      </button>
      <button
        type="submit"
        name="voteType"
        value={`interest-${boardgame.id}`}
        className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-blue-400 disabled:opacity-25"
        disabled={canVoteOnGame(user, boardgame, "interest") === "CannotVote"}
      >
        <FaRegLightbulb className="h-10 w-10" />
      </button>
    </Form>
  );
};
