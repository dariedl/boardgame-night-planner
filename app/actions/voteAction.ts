import { hostBoardgame } from '~/server/services/boardgame.service';
import { voteOnBoardgame } from '~/server/vote.server';

export const voteAction = async (form: FormData, authUserId: string) => {
	const commitValue = form.get('commitBtn');
	const interestValue = form.get('interestBtn');
	const hostAddValue = form.get('hostAddBtn');
	const hostRemoveValue = form.get('hostRemoveBtn');
	if (commitValue) {
		const boardgameId = commitValue.toString();
		await voteOnBoardgame(authUserId, boardgameId, 'commit');
	} else if (interestValue) {
		const boardgameId = interestValue.toString();
		await voteOnBoardgame(authUserId, boardgameId, 'interest');
	} else if (hostAddValue) {
		const boardgameId = hostAddValue.toString();
		await hostBoardgame(boardgameId, authUserId);
	} else if (hostRemoveValue) {
		const boardgameId = hostRemoveValue.toString();
		await hostBoardgame(boardgameId, authUserId);
	}
	return null;
};
