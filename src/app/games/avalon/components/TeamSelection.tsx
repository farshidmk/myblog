import React from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";

type Props = {
  setShowMission: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamSelection = ({ setShowMission }: Props) => {
  const { players, currentMission, setMissions, missions } = useAvalonGame();
  const playersInMission = missions[currentMission - 1]?.team;

  function handlePlayersInMission(player: string) {
    setMissions((p) => {
      console.log(
        p[currentMission - 1]?.team?.includes(player),
        p[currentMission - 1]?.team?.length
      );
      p[currentMission - 1] = {
        ...p[currentMission - 1],

        // team: [...(p[currentMission - 1]?.team || []), player],

        team:
          p[currentMission - 1]?.team?.length &&
          p[currentMission - 1]?.team?.includes(player)
            ? p[currentMission - 1]?.team?.filter((p) => p !== player)
            : [...(p[currentMission - 1]?.team || []), player],
      };
      debugger;
      return { ...p };
    });
  }

  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  return (
    <div className="container mx-auto max-w-xl">
      <h1>Team Selection</h1>
      <div className="flex flex-wrap gap-2">
        {players.map((player) => (
          <div
            key={player.playerName}
            className={`rounded-full p-2 ${
              playersInMission?.includes(player.playerName)
                ? "bg-blue-500"
                : "bg-grey-500"
            }`}
            onClick={() => {
              handlePlayersInMission(player.playerName);
            }}
          >
            {player.playerName}
          </div>
        ))}
      </div>
      <button
        disabled={
          playersInMission?.length === requirements.team[currentMission - 1]
        }
        onClick={() => {
          setShowMission(true);
        }}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medieval rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 border-2 border-purple-300 uppercase tracking-wider"
      >
        start mission
      </button>
    </div>
  );
};

export default TeamSelection;
