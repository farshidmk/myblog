import Image from "next/image";
import { AvalonRole } from "../avalon-types";

const CharacterCard = ({ isEvil, imgUrl, name }: AvalonRole) => {
  return (
    <div
      className={`flex flex-col gap-0 w-28 h-fit shadow-2xl  rounded-md ${
        isEvil ? "shadow-red-600" : "shadow-blue-600"
      }`}
    >
      <Image
        src={imgUrl}
        alt={name}
        className="rounded-t-xl"
        width={120}
        height={120}
      />
      <p
        className={`text-white ${
          isEvil ? "bg-red-500" : "bg-blue-600"
        } fansy-font text-center rounded-b-md text-sm `}
      >
        {name}
      </p>
    </div>
  );
};

export default CharacterCard;
