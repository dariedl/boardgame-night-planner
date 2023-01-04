import { Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import type { BoardgameWithVotes } from '~/shared/boardgame';
import type { VoteType } from '~/shared/vote';
import { colors } from './colors';

type VoteTypeWithHost = VoteType | 'host';
const mapVoteToCircleColor = (type: VoteTypeWithHost) => {
	if (type === 'host') {
		return colors.bg_hosted;
	} else if (type === 'commit') {
		return colors.bg_commit;
	} else if (type === 'interest') {
		return colors.bg_interest;
	} else {
		return colors.bg_blank;
	}
};

interface Circle {
	userName: string;
	type: VoteTypeWithHost;
}

interface PlayerCirclesProps {
	boardgame: BoardgameWithVotes;
}

export const PlayerCircles = ({ boardgame }: PlayerCirclesProps) => {
	let circles: Circle[] = [];
	if (boardgame.hostedBy) {
		circles.push({ userName: boardgame.hostedBy.name, type: 'host' });
	}
	const sortedVotes = [...boardgame.votes].sort((voteA, voteB) => {
		if (voteA.type === 'commit') {
			return -1;
		} else if (voteB.type === 'commit') {
			return +1;
		} else {
			return -1;
		}
	});
	sortedVotes.forEach((vote) => {
		circles.push({ userName: vote.userName, type: vote.type });
	});

	return (
		<div className="flex">
			{circles.length === 0 && (
				<Typography className={colors.text_gray}>No one is currently hosting this game.</Typography>
			)}
			{circles.map((circle, index) => {
				return <PlayerCircle key={index} {...circle} />;
			})}
		</div>
	);
};

const PlayerCircle = ({ userName, type }: Circle) => {
	const [showPopover, setShowPopover] = useState(false);
	return (
		<Popover open={showPopover} placement="bottom">
			<PopoverHandler>
				<div
					onMouseEnter={() => setShowPopover(true)}
					onMouseLeave={() => setShowPopover(false)}
					className={`mr-2 h-8 w-8 rounded-full border-2 border-black ${mapVoteToCircleColor(type)} shadow-xl`}
				/>
			</PopoverHandler>
			<PopoverContent>
				{type === 'host' && `Hosted by: ${userName}`}
				{type !== 'host' && userName}
			</PopoverContent>
		</Popover>
	);
};
