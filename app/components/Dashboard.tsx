import type { UserInformation } from '~/shared/user';
import { Button, Card } from '@material-tailwind/react';
import { colors } from './colors';
import { Form } from '@remix-run/react';
import type { BoardgameWithVotes } from '~/shared/boardgame';

interface DashboardProps {
	user: UserInformation;
	boardgames: BoardgameWithVotes[];
}

export const Dashboard = ({ user, boardgames }: DashboardProps) => {
	const hostedGames = boardgames
		.filter((game) => game.hostedBy && game.hostedBy?.id === user.id)
		.map((game) => game.title);
	const commitGames = boardgames
		.filter((game) => game.votes.some((vote) => vote.userId === user.id && vote.type === 'commit'))
		.map((game) => game.title);
	const interestGames = boardgames
		.filter((game) => game.votes.some((vote) => vote.userId === user.id && vote.type === 'interest'))
		.map((game) => game.title);

	return (
		<Form method="post">
			<Card className={`flex flex-row justify-between m-3 p-4 border-2 border-black `}>
				<div className="flex flex-col">
					<span className="font-bold">Username: {user?.name} </span>
					<span className={`${colors.text_hosted}`}>
						Hosting ({hostedGames.length}): {hostedGames.join(', ')}
					</span>

					<span className={`${colors.text_commit}`}>
						Strongly Intested In ({commitGames.length}/{user?.maxCommitVotes}): {commitGames.join(', ')}
					</span>
					<span className={`${colors.text_interest} `}>
						Interested In ({interestGames.length}/{user?.maxInterestVotes}): {interestGames.join(', ')}
					</span>
				</div>
				<div className="flex flex-col">
					<Button type="submit" name="intent" value="logout" className="bg-red-500 mb-5">
						Logout
					</Button>
				</div>
			</Card>
		</Form>
	);
};
