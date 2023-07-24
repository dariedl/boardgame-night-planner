import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { logoutAction } from '~/actions/logoutAction';
import { voteAction } from '~/actions/voteAction';
import { BoardgameItem } from '~/components/BoardgameItem';
import { Dashboard } from '~/components/Dashboard';
import { authenticator } from '~/server/auth/auth.server';
import { getBoardgameList } from '~/server/boardgame.server';
import { getUserInformation } from '~/server/user.server';
import { determineHostStatus } from '~/shared/boardgame';
import type { VoteType } from '~/shared/vote';

type LoaderData = {
	boardgames: Awaited<ReturnType<typeof getBoardgameList>>;
	user: Awaited<ReturnType<typeof getUserInformation>>;
};

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const authUser = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	});
	const isLogout = form.get('intent');
	console.log(isLogout);
	if (isLogout === 'logout') {
		return logoutAction(request);
	}

	return voteAction(form, authUser.id);
};

export const loader: LoaderFunction = async ({ request }) => {
	const authUser = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	});

	return json<LoaderData>({
		boardgames: await getBoardgameList(),
		user: await getUserInformation(authUser.id),
	});
};

export default function Boardgames() {
	const { boardgames, user } = useLoaderData() as LoaderData;

	// sort alphabetically
	boardgames.sort((aGame, bGame) => {
		if (aGame.title < bGame.title) {
			return -1;
		}
		if (aGame.title > bGame.title) {
			return 1;
		}
		return 0;
	});

	// sort by popularity
	boardgames.sort((aGame, bGame) => {
		return bGame.votes.length - aGame.votes.length;
	});

	return (
		<main>
			<Dashboard user={user}></Dashboard>
			<ul className="m-5">
				{boardgames.map((boardgame) => (
					<li key={boardgame.title} className="mb-0.5">
						<BoardgameItem boardgame={boardgame} user={user} />
					</li>
				))}
			</ul>
		</main>
	);
}
