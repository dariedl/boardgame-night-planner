import { Card } from '@material-tailwind/react';
import type { BoardgameWithVotes, HostStatus } from '~/shared/boardgame';
import { determineHostStatus } from '~/shared/boardgame';
import type { UserInformation } from '~/shared/user';
import type { VoteType } from '~/shared/vote';
import { colors } from './colors';
import { PlayerCircles } from './PlayerCircles';
import { RatingStars } from './RatingStars';
import { VoteButton } from './VoteButton';

interface BoardgameItemProps {
	boardgame: BoardgameWithVotes;
	user: UserInformation;
}

const mapVoteToBgColor = (type: VoteType, hostStatus: HostStatus) => {
	if (hostStatus === 'HostedByUser') {
		return colors.bg_hosted;
	} else if (type === 'commit') {
		return colors.bg_commit;
	} else if (type === 'interest') {
		return colors.bg_interest;
	} else {
		return colors.bg_blank;
	}
};

export const BoardgameItem = ({ boardgame, user }: BoardgameItemProps) => {
	const { title, description, minPlayers, maxPlayers, urlLink } = boardgame;
	const header = minPlayers === maxPlayers ? `${title} (${minPlayers})` : `${title} (${minPlayers}-${maxPlayers})`;

	const currentVote = boardgame.votes.find((vote) => vote.userId === user.id);
	let votedOnWith: VoteType = 'none';
	if (currentVote) {
		votedOnWith = currentVote.type;
	}

	const hostStatus = determineHostStatus(boardgame, user.id);
	const bgColor = mapVoteToBgColor(votedOnWith, hostStatus);

	return (
		<div className={`flex flex-row justify-between border-2 border-black ${colors.bg_blank}`}>
			<div className="flex w-4/5">
				{urlLink && (
					<Card className={`p-4 border-2 border-black ${bgColor}`}>
						<div className="mb-1 border-2 border-black">
							<img src={urlLink} alt="something useful here" width={120} height={120} />
						</div>
						<RatingStars weight={boardgame.weight} />
					</Card>
				)}
				<Card className={`p-2 ${colors.bg_blank}`}>
					<h1 className={`mt-0 mb-6 text-5xl font-bold ${colors.text_title}`}>{header}</h1>
					<h3 className="mb-4 text-3xl font-bold">{description}</h3>
					<PlayerCircles boardgame={boardgame} />
				</Card>
			</div>
			<VoteButton user={user} boardgame={boardgame}></VoteButton>
		</div>
	);
};
