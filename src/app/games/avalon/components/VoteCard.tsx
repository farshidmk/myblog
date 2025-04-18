import React, { useState } from "react";
import { useAvalonGame } from "../AvalonProvider";

type Props = {
  playerName: string;
  handleSubmitVote?: () => void;
};

const VoteCard = ({ playerName, handleSubmitVote }: Props) => {
  const [showWarning, setShowWarning] = useState(false);
  const { setMissions, currentMission, players } = useAvalonGame();
  const player = players.find((p) => p.playerName === playerName);
  function handleVote(isSuccess: boolean) {
    if (player?.isEvil === false && !isSuccess) {
      setShowWarning(true);
      return;
    }
    setMissions((p) => {
      p[currentMission - 1] = {
        ...p[currentMission - 1],
        votes: { ...p[currentMission - 1]?.votes, [playerName]: isSuccess },
      };
      setShowWarning(false);
      return p;
    });
    handleSubmitVote?.();
  }
  return (
    <div className="absolute top-0 left-0 w-full h-dvh flex flex-col items-center justify-center bg-gradient-to-r from-gray-600/70 to-gray-100">
      <h3 className="text-2xl font-bold text-gray-800">{player?.playerName}</h3>
      <div className="flex gap-2 items-center justify-center">
        <button
          className="flex-1 flex items-end justify-center px-2 sm:w-48 h-32 sm:h-48 m-2 bg-contain bg-center bg-no-repeat hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg border-2 border-gold hover:border-4 hover:shadow-2xl"
          style={{ backgroundImage: "url('/images/avalon/chooseSuccess.png')" }}
          onClick={() => handleVote(true)}
        >
          <span className="text-2xl font-bold text-green-500 bg-gray-100 rounded-md">
            موفقیت
          </span>
        </button>
        <button
          className="flex-1 flex items-end justify-center px-2 sm:w-48 h-32 sm:h-48 m-2 bg-contain bg-center bg-no-repeat hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg border-2 border-gold hover:border-4 hover:shadow-2xl"
          style={{ backgroundImage: "url('/images/avalon/chooseDefeat.png')" }}
          onClick={() => handleVote(false)}
        >
          <span className="text-2xl font-bold text-red-700 bg-gray-200 rounded-md">
            شکست
          </span>
        </button>
      </div>
      {showWarning && (
        <div className="bg-amber-100 border-amber-500 border-2 rounded-lg p-2 text-ellipsis">
          شما در تیم خیر هستید و نباید به ماموریت شکست بدهید!
        </div>
      )}
    </div>
  );
};

export default VoteCard;
