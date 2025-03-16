import React from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";

type Props = {
  setShowMission: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamSelection = ({ setShowMission }: Props) => {
  const { players, currentMission, setMissions, missions } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  const remainingPlayers =
    requirements.team[currentMission - 1] -
    (missions[currentMission - 1]?.team?.length || 0);
  const playersInMission = missions[currentMission - 1]?.team;
  function handlePlayersInMission(player: string) {
    setMissions((prevMissions) => {
      const currentTeam = prevMissions[currentMission - 1]?.team || [];
      const isPlayerInTeam = currentTeam.includes(player);
      if (!isPlayerInTeam && remainingPlayers === 0) {
        return {
          ...prevMissions,
        };
      }

      const updatedMission = {
        ...prevMissions[currentMission - 1],
        team: isPlayerInTeam
          ? currentTeam.filter((p) => p !== player) // remove player if already in team
          : [...currentTeam, player], // add player if not in team
      };

      return {
        ...prevMissions,
        [currentMission - 1]: updatedMission,
      };
    });
  }

  return (
    <div className="container mx-auto max-w-xl">
      <h1 className="text-2xl font-bold mb-1">انتخاب تیم</h1>
      <div className="flex flex-wrap gap-2 mb-2">
        {players.map((player) => (
          <div
            key={player.playerName}
            className={`rounded-md border-1 border p-2 
              
              ${
                playersInMission?.includes(player.playerName)
                  ? "bg-amber-100 border-amber-500 "
                  : remainingPlayers === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-200 border-gray-500 "
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
        disabled={remainingPlayers !== 0}
        onClick={() => {
          setShowMission(true);
        }}
        className="w-full py-3 px-6 mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medieval rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 border-2 border-purple-300 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:opacity-50 disabled:hover:bg-gray-500"
      >
        {remainingPlayers === 0
          ? "شروع ماموریت"
          : `شروع ماموریت (${remainingPlayers} بازیکن بیشتر)`}
      </button>
    </div>
  );
};

export default TeamSelection;
