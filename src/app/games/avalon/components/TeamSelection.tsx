"use client";
import React, { useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";
import { AvalonPlayer } from "../avalon-types";

type Props = {
  setShowMission: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamSelection = ({ setShowMission }: Props) => {
  const [playersInMission, setPlayersInMission] = useState<AvalonPlayer[]>([]);
  const { players, currentMission, setMissions } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  const remainingPlayers =
    requirements.team[currentMission - 1] - playersInMission.length;

  function handlePlayersInMission(
    player: AvalonPlayer,
    isPlayerInTeam: boolean
  ) {
    setPlayersInMission((currentTeam) => {
      if (isPlayerInTeam) {
        const index = currentTeam.findIndex(
          (p) => p.playerName === player.playerName
        );
        if (index > -1) {
          const temp = [...currentTeam];
          temp.splice(index, 1);
          return temp;
        }
      } else {
        return [...currentTeam, player];
      }
      return [...currentTeam];
    });
  }

  function startMission() {
    setMissions((prevMissions) => {
      const updatedMission = {
        ...prevMissions[currentMission - 1],
        team: playersInMission.map((p) => p.playerName),
      };

      const temp = [...prevMissions];
      temp[currentMission - 1] = { ...updatedMission };
      return temp;
      // return [
      //   ...prevMissions,
      //   [currentMission - 1]: updatedMission,
      // ];
    });
    setPlayersInMission([]);
    setShowMission(true);
  }

  return (
    <div className="container mx-auto max-w-xl p-1">
      <h1 className="text-2xl font-bold mb-1">انتخاب تیم</h1>
      <div className="flex flex-wrap gap-2 mb-2">
        {players.map((player) => {
          const isPlayerInTeam = Boolean(
            playersInMission.find((p) => p.playerName === player.playerName)
          );
          return (
            <button
              key={player.playerName}
              disabled={!isPlayerInTeam && remainingPlayers === 0}
              className={`rounded-md border-1 border p-2 
              ${
                isPlayerInTeam
                  ? "bg-amber-100 border-amber-500 "
                  : remainingPlayers === 0
                  ? "opacity-50 "
                  : "bg-gray-200 border-gray-500 "
              }`}
              onClick={() => {
                handlePlayersInMission(player, isPlayerInTeam);
              }}
            >
              {player.playerName}
            </button>
          );
        })}
      </div>
      <button
        disabled={remainingPlayers !== 0}
        onClick={startMission}
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

// function useHandlePlayersInMission() {
//   const { currentMission, setMissions, players, missions } = useAvalonGame();
//   const requirements =
//     MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
//   const remainingPlayers =
//     requirements.team[currentMission - 1] -
//     (missions[currentMission - 1]?.team?.length || 0);
//   const playersInMission = missions[currentMission - 1]?.team;
//   const handlePlayersInMission = useCallback(
//     (player: string) => {
//       console.log("handlePlayersInMission", player);
//       setMissions((prevMissions) => {
//         const currentTeam = prevMissions[currentMission - 1]?.team || [];
//         const isPlayerInTeam = currentTeam.includes(player);
//         debugger;
//         if (!isPlayerInTeam && remainingPlayers === 0) {
//           debugger;
//           return [...prevMissions];
//         }

//         const updatedMission = {
//           ...prevMissions[currentMission - 1],
//           team: isPlayerInTeam
//             ? currentTeam.filter((p) => p !== player) // remove player if already in team
//             : [...currentTeam, player], // add player if not in team
//         };
//         debugger;

//         prevMissions[currentMission - 1] = { ...updatedMission };

//         return structuredClone(prevMissions);
//       });
//     },
//     [currentMission, remainingPlayers, setMissions]
//   );
//   return { handlePlayersInMission };
// }
