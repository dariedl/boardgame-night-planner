import { MdStarBorder, MdStarRate } from "react-icons/md";
import type { Weight } from "~/shared/boardgame";

interface RatingStarsProps {
  weight: Weight;
}

export const RatingStars = ({ weight }: RatingStarsProps) => {
  switch (weight) {
    case "undefined":
      return (
        <div className="flex justify-around">
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
        </div>
      );
    case "light":
      return (
        <div className="flex justify-around">
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
        </div>
      );
    case "midweight":
      return (
        <div className="flex justify-around">
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
          <MdStarBorder className="h-8 w-8"></MdStarBorder>
        </div>
      );
    case "heavy":
      return (
        <div className="flex justify-around">
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
          <MdStarRate className="h-8 w-8 fill-yellow-500"></MdStarRate>
        </div>
      );
  }
};
