import { MdStarBorder, MdStarRate } from 'react-icons/md';
import type { Weight } from '~/shared/boardgame';
import { colors } from './colors';

interface RatingStarsProps {
	weight: Weight;
}

export const RatingStars = ({ weight }: RatingStarsProps) => {
	switch (weight) {
		case 'undefined':
			return (
				<div className="flex justify-around">
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
				</div>
			);
		case 'light':
			return (
				<div className="flex justify-around">
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
				</div>
			);
		case 'midweight':
			return (
				<div className="flex justify-around">
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
					<MdStarBorder className="h-8 w-8"></MdStarBorder>
				</div>
			);
		case 'heavy':
			return (
				<div className="flex justify-around">
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
					<MdStarRate className={`h-8 w-8 ${colors.fill_yellow}`}></MdStarRate>
				</div>
			);
	}
};
