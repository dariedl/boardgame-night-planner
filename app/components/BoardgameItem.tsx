import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { BoardgameWithVotes } from "~/shared/boardgame";
import { UserInformation } from "~/shared/user";
import { VoteType, VoteWithName } from "~/shared/vote";

interface BoardgameItemProps {
  boardgame: BoardgameWithVotes;
  user: UserInformation;
}

/* 
There are as many vote circles as there are max Players, with a maximum of 20
There needs to be a show interest and a commit button
If you vote with interest there will be a blue vote appearing, also games you yourself have voted on
are also highlighted blue.
Same for commit but with green
*/

const mapVoteToCircleColor = (type?: VoteType) => {
  if (type === "commit") {
    return "bg-green-600";
  } else if (type === "interest") {
    return "bg-blue-500";
  } else {
    return "bg-white";
  }
};

const mapVoteToBgColor = (type?: VoteType) => {
  if (type === "commit") {
    return "bg-green-500";
  } else if (type === "interest") {
    return "bg-blue-400";
  } else {
    return "bg-slate-200";
  }
};
// Was wenn mehr interesse als max spieleranzahl?
// Spielgewicht
export const BoardgameItem: React.FC<BoardgameItemProps> = ({
  boardgame,
  user,
}) => {
  const {
    title,
    description,
    minPlayers,
    maxPlayers,
    urlLink,
    votes: boardgameVotes,
  } = boardgame;
  const header =
    minPlayers === maxPlayers
      ? `${title} (${minPlayers})`
      : `${title} (${minPlayers}-${maxPlayers})`;

  const currentVote = boardgame.votes.find((vote) => vote.userId === user.id);
  let votedOnWith: VoteType = "none";
  if (currentVote) {
    votedOnWith = currentVote.type;
  }

  const bgColor = mapVoteToBgColor(votedOnWith);
  const sortedVotes: Partial<VoteWithName>[] = [...boardgameVotes].sort(
    (voteA, voteB) => {
      if (voteA.type === "commit") {
        return -1;
      } else if (voteB.type === "commit") {
        return +1;
      } else {
        return -1;
      }
    }
  );
  for (let i = sortedVotes.length; i < maxPlayers; i++) {
    sortedVotes.push({ type: "none" });
  }
  return (
    <div className={`flex justify-between ${bgColor}`}>
      <div className="flex w-4/5">
        {urlLink && (
          <img
            src={urlLink}
            alt="something useful here"
            width={180}
            height={180}
          />
        )}
        <div className="p-2">
          <h1 className="mt-0 mb-6 text-5xl font-bold text-rose-900">
            {header}
          </h1>
          <h3 className="mb-4 text-3xl font-bold">{description}</h3>
          <div className="flex">
            {sortedVotes.map((vote, index) => {
              return (
                <div
                  key={index}
                  className={`mr-2 h-8 w-8 rounded-full border-2 border-black ${mapVoteToCircleColor(
                    vote.type
                  )} shadow-xl`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex w-max flex-col justify-center">
        <button className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-green-500">
          <FaRegThumbsUp className="h-10 w-10" />
        </button>
        <button className="w-fit border-2 border-black rounded mr-5 mb-5 mt-5 bg-blue-400">
          <FaRegLightbulb className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};
