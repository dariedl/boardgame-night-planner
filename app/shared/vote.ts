import { BoardgameWithVotes } from './boardgame';
import { UserInformation } from './user';

export type VoteType = 'interest' | 'commit' | 'none';

export interface Vote {
	userId: string;
	boardgameId: string;
	type: VoteType;
}

export interface VoteWithName extends Vote {
	userName: string;
}

export type CanVoteResult = 'RemoveVote' | 'AddVote' | 'ReplaceVote' | 'None';

export function checkVoteStatus(user: UserInformation, boardgame: BoardgameWithVotes, type: VoteType): CanVoteResult {
	const currentVote = boardgame.votes.find((vote) => vote.userId === user.id);
	const canCommit = hasCommitVotes(user, type);
	const canInterest = hasInterestVotes(user, type);

	if (currentVote && currentVote.type === type) {
		return 'RemoveVote';
	} else if (currentVote && type === 'commit' && canCommit) {
		return 'ReplaceVote';
	} else if (currentVote && type === 'interest' && canInterest) {
		return 'ReplaceVote';
	} else if (!currentVote && type === 'commit' && canCommit) {
		return 'AddVote';
	} else if (!currentVote && type === 'interest' && canInterest) {
		return 'AddVote';
	}
	return 'None';
}

export function hasCommitVotes(user: UserInformation, type: VoteType) {
	const commitVotes = user.votes.filter((vote) => vote.type === 'commit');
	if (type === 'commit' && commitVotes.length >= user.maxCommitVotes) {
		return false;
	}
	return true;
}

export function hasInterestVotes(user: UserInformation, type: VoteType) {
	const interestVotes = user.votes.filter((vote) => vote.type === 'interest');
	if (type === 'interest' && interestVotes.length >= user.maxInterestVotes) {
		return false;
	}
	return true;
}
export function mapStringToVoteType(type: string): VoteType {
	return type === 'commit' ? 'commit' : type === 'interest' ? 'interest' : 'none';
}
