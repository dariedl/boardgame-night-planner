import { Form } from '@remix-run/react';
import type { BoardgameWithVotes } from '~/shared/boardgame';
import { determineHostStatus } from '~/shared/boardgame';
import type { UserInformation } from '~/shared/user';
import { Button } from '@material-tailwind/react';

interface VoteButtonProps {
	boardgame: BoardgameWithVotes;
	user: UserInformation;
}

export const VoteButton = ({ user, boardgame }: VoteButtonProps) => {
	const hostedStatus = determineHostStatus(boardgame, user.id);

	const userVote = boardgame.votes.find((vote) => vote.userId === user.id);
	const userHasCommitVoted = userVote?.type === 'commit';
	const userHasInterestVoted = userVote?.type === 'interest';

	return (
		<Form className="flex w-max flex-col justify-center" method="post">
			{hostedStatus === 'HostedByOther' && (
				<>
					{userHasCommitVoted && (
						<Button type="submit" name="commitBtn" value={boardgame.id} className="p-2 text-black m-2 mr-4 bg-gray-400">
							Don't want to play
						</Button>
					)}
					{!userHasCommitVoted && (
						<Button
							type="submit"
							name="commitBtn"
							value={boardgame.id}
							className="p-2 text-black m-2 mr-4 bg-green-500"
						>
							Want to play!
						</Button>
					)}
					{userHasInterestVoted && (
						<Button
							type="submit"
							name="interestBtn"
							value={boardgame.id}
							color="blue"
							className="p-2 text-black m-2 mr-4 bg-gray-400"
						>
							Not interested
						</Button>
					)}
					{!userHasInterestVoted && (
						<Button
							type="submit"
							name="interestBtn"
							value={boardgame.id}
							color="blue"
							className="p-2 text-black m-2 mr-4 bg-blue-500"
						>
							Interested
						</Button>
					)}
				</>
			)}
			{hostedStatus === 'NotHosted' && (
				<Button type="submit" name="hostAddBtn" value={boardgame.id} className="p-2 text-black m-2 mr-4 bg-red-700">
					Host game
				</Button>
			)}
			{hostedStatus === 'HostedByUser' && (
				<Button type="submit" name="hostRemoveBtn" value={boardgame.id} className="p-2 text-black m-2 mr-4 bg-gray-400">
					Unhost
				</Button>
			)}
		</Form>
	);
};
