import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { Boardgame } from "~/shared/domain/boardgame";

interface BoardgameItemProps {
  boardgame: Boardgame;
}

/* 
There are as many vote circles as there are max Players, with a maximum of 20
There needs to be a show interest and a commit button
If you vote with interest there will be a blue vote appearing, also games you yourself have voted on
are also highlighted blue.
Same for commit but with green
*/
type VoteType = "none" | "interest" | "commit";
interface Vote {
  player?: string;
  type: VoteType;
}
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
export const BoardgameItem: React.FC<BoardgameItemProps> = ({ boardgame }) => {
  const { title, description, minPlayers, maxPlayers, urlLink } = boardgame;
  const header =
    minPlayers === maxPlayers
      ? `${title} (${minPlayers})`
      : `${title} (${minPlayers}-${maxPlayers})`;
  const votes: Vote[] = [
    { player: "Tom", type: "interest" },
    { player: "Jane", type: "interest" },
    { player: "Max", type: "commit" },
  ];
  let votedOnWith: VoteType = "none";
  if (maxPlayers === 5) {
    votedOnWith = "commit";
  } else if (maxPlayers === 4) {
    votedOnWith = "interest";
  }
  const bgColor = mapVoteToBgColor(votedOnWith);
  const sortedVotes = [...votes].sort((voteA, voteB) => {
    if (voteA.type === "commit") {
      return -1;
    } else if (voteB.type === "commit") {
      return +1;
    } else {
      return -1;
    }
  });
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
