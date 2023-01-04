import { Card } from '@material-tailwind/react';
import type { BoardgameWithVotes, HostStatus } from '~/shared/boardgame';
import { determineHostStatus } from '~/shared/boardgame';
import type { UserInformation } from '~/shared/user';
import type { VoteType, VoteWithName } from '~/shared/vote';
import { RatingStars } from './RatingStars';
import { VoteButton } from './VoteButton';

interface BoardgameItemProps {
	boardgame: BoardgameWithVotes;
	user: UserInformation;
}

const mapVoteToCircleColor = (type?: VoteType) => {
	if (type === 'commit') {
		return 'bg-green-600';
	} else if (type === 'interest') {
		return 'bg-blue-500';
	} else {
		return 'bg-white';
	}
};

const mapVoteToBgColor = (type: VoteType, hostStatus: HostStatus) => {
	if (hostStatus === 'HostedByUser') {
		return 'bg-red-700';
	} else if (hostStatus === 'NotHosted') {
		return 'bg-gray-400';
	} else if (type === 'commit') {
		return 'bg-green-500';
	} else if (type === 'interest') {
		return 'bg-blue-400';
	} else {
		return 'bg-slate-200';
	}
};

export const BoardgameItem = ({ boardgame, user }: BoardgameItemProps) => {
	const { title, description, minPlayers, maxPlayers, urlLink, votes: boardgameVotes } = boardgame;
	const header = minPlayers === maxPlayers ? `${title} (${minPlayers})` : `${title} (${minPlayers}-${maxPlayers})`;

	const currentVote = boardgame.votes.find((vote) => vote.userId === user.id);
	let votedOnWith: VoteType = 'none';
	if (currentVote) {
		votedOnWith = currentVote.type;
	}

	const sortedVotes: Partial<VoteWithName>[] = [...boardgameVotes].sort((voteA, voteB) => {
		if (voteA.type === 'commit') {
			return -1;
		} else if (voteB.type === 'commit') {
			return +1;
		} else {
			return -1;
		}
	});

	const hostStatus = determineHostStatus(boardgame, user.id);
	const bgColor = mapVoteToBgColor(votedOnWith, hostStatus);

	return (
		<div className="flex flex-row justify-between bg-slate-200 border-2 border-black">
			<div className="flex w-4/5">
				{urlLink && (
					<Card className={`p-4 border-2 border-black ${bgColor}`}>
						<div className="mb-1 border-2 border-black">
							<img src={urlLink} alt="something useful here" width={120} height={120} />
						</div>
						<RatingStars weight={boardgame.weight} />
					</Card>
				)}
				<Card className="p-2 bg-slate-200">
					<h1 className="mt-0 mb-6 text-5xl font-bold text-rose-900">{header}</h1>
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
				</Card>
			</div>
			<VoteButton user={user} boardgame={boardgame}></VoteButton>
		</div>
	);
};
