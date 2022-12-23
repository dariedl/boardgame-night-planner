import { Form } from "@remix-run/react";
import { FaRegLightbulb, FaRegThumbsUp } from "react-icons/fa";
import { BsPersonPlus, BsPersonDash } from "react-icons/bs";
import type { BoardgameWithVotes } from "~/shared/boardgame";
import type { UserInformation } from "~/shared/user";

interface VoteButtonProps {
  boardgame: BoardgameWithVotes;
  user: UserInformation;
}
type HostStatus = "NotHosted" | "HostedByMe" | "HostedByOther";

export const VoteButtons = ({ user, boardgame }: VoteButtonProps) => {
  let hostedStatus: HostStatus;
  if (!boardgame.hostedBy) {
    hostedStatus = "NotHosted";
  } else if (boardgame.hostedBy.id === user.id) {
    hostedStatus = "HostedByMe";
  } else {
    hostedStatus = "HostedByOther";
  }

  return (
    <Form className="flex w-max flex-col justify-center" method="post">
      {hostedStatus === "HostedByOther" && (
        <div>
          <button
            type="submit"
            name="commitBtn"
            value={boardgame.id}
            className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-green-500 disabled:opacity-25"
          >
            <FaRegThumbsUp className="h-10 w-10" />
          </button>
          <button
            type="submit"
            name="interestBtn"
            value={boardgame.id}
            className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-blue-400 disabled:opacity-25"
          >
            <FaRegLightbulb className="h-10 w-10" />
          </button>
        </div>
      )}
      {hostedStatus === "NotHosted" && (
        <div>
          <button
            type="submit"
            name="hostAddBtn"
            value={boardgame.id}
            className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-red-500"
          >
            <BsPersonPlus className="h-10 w-10" />
          </button>
        </div>
      )}
      {hostedStatus === "HostedByMe" && (
        <div>
          <button
            type="submit"
            name="hostRemoveBtn"
            value={boardgame.id}
            className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-red-500"
          >
            <BsPersonDash className="h-10 w-10" />
          </button>
        </div>
      )}
    </Form>
  );
};
