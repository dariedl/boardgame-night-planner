import type { User } from './user';
import type { VoteWithName } from './vote';

export type Weight = 'light' | 'midweight' | 'heavy' | 'undefined';

export interface Boardgame {
	id: string;
	title: string;
	hostedBy?: User;
	urlLink?: string;
	description?: string;
	minPlayers: number;
	maxPlayers: number;
	weight: Weight;
}

export interface BoardgameWithVotes extends Boardgame {
	votes: VoteWithName[];
}

export type HostStatus = 'NotHosted' | 'HostedByUser' | 'HostedByOther';
export const determineHostStatus = (boardgame: Boardgame, userId: string): HostStatus => {
	if (!boardgame.hostedBy) {
		return 'NotHosted';
	} else if (boardgame.hostedBy.id === userId) {
		return 'HostedByUser';
	} else {
		return 'HostedByOther';
	}
};
