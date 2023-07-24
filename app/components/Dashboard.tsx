import type { UserInformation } from '~/shared/user';
import { Button, Card } from '@material-tailwind/react';
import { colors } from './colors';
import { Form } from '@remix-run/react';
import { BoardgameWithVotes } from '~/shared/boardgame';

interface DashboardProps {
	user: UserInformation;
	boardgames: BoardgameWithVotes[];
}

export const Dashboard = ({ user, boardgames }: DashboardProps) => {
	const interestVotes = user.votes.filter((vote) => vote.type === 'interest') ?? [];
	const commitVotes = user.votes.filter((vote) => vote.type === 'commit') ?? [];
	return (
		<Card className={`flex flex-row justify-between m-2 p-4 border-2 border-black `}>
			<div className="flex flex-col">
				<span>Username: {user?.name} </span>
				<span className={`${colors.text_interest}`}>
					Interested In: {interestVotes.length}/{user?.maxInterestVotes}
				</span>
				<span className={`${colors.text_commit}`}>
					Strongly Intested In: {commitVotes.length}/{user?.maxCommitVotes}
				</span>
			</div>
			<Form method="post">
				<Button type="submit" name="intent" value="logout">
					Logout
				</Button>
			</Form>
		</Card>
	);
};
