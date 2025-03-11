import React from "react";
import { useAvalonGame } from "../AvalonProvider";

type Props = {
  playerName: string;
  handleSubmitVote: () => void;
};

const MissionVote = ({ playerName, handleSubmitVote }: Props) => {
  const { setMissions, currentMission } = useAvalonGame();
  function handleVote(vote: boolean) {
    setMissions((p) => {
      p[currentMission - 1] = {
        ...p[currentMission - 1],
        votes: { ...p[currentMission - 1]?.votes, [playerName]: vote },
      };
      return p;
    });
    handleSubmitVote();
  }

  return (
    <div>
      <h3>{playerName}</h3>
      <button
        className="w-full sm:w-48 h-32 sm:h-48 m-2 bg-contain bg-center bg-no-repeat hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg border-2 border-gold hover:border-4 hover:shadow-2xl"
        style={{ backgroundImage: "url('/avalon/chooseSuccess.png')" }}
        onClick={() => handleVote(true)}
      >
        <span className="sr-only">Accept</span>
      </button>
      <button
        className="w-full sm:w-48 h-32 sm:h-48 m-2 bg-contain bg-center bg-no-repeat hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg border-2 border-gold hover:border-4 hover:shadow-2xl"
        style={{ backgroundImage: "url('/avalon/chooseDefeat.png')" }}
        onClick={() => handleVote(false)}
      >
        <span className="sr-only">Reject</span>
      </button>
    </div>
  );
};

export default MissionVote;
