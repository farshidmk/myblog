import React, { useEffect, useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";
import Missions from "./Missions";
import TeamSelection from "./TeamSelection";
import MissionVote from "./MissionVote";

const GameBoard = () => {
  const [showMission, setShowMission] = useState(false);
  const {
    players,
    currentMission,
    missions,
    leaderIndex,
    currentProposal,
    setCurrentProposal,
    setMissions,
    setCurrentMission,
    setLeaderIndex,
  } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  const currentMissionTeamSize = requirements.team[currentMission - 1];
  const requiredFails = requirements.fails[currentMission - 1];
  const [playersInVote, setPlayersInVote] = useState<string[]>([]);
  useEffect(() => {
    if (showMission) {
      setPlayersInVote(missions[currentMission - 1].team || []);
    }
  }, [currentMission, missions, showMission]);

  console.log({
    players,
    currentMission,
    missions,
    leaderIndex,
    currentProposal,
  });
  useEffect(() => {
    if (leaderIndex === -1) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setLeaderIndex(randomIndex);
    }
  }, [leaderIndex, players.length, setLeaderIndex]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {players[leaderIndex].playerName}
      </div>
      <TeamSelection setShowMission={setShowMission} />
      <Missions />

      {showMission && (
        <MissionVote
          playerName={playersInVote[playersInVote.length]}
          handleSubmitVote={() =>
            setPlayersInVote((players) =>
              players.filter(
                (player) => player !== playersInVote[playersInVote.length]
              )
            )
          }
        />
      )}
    </div>
  );
};

export default GameBoard;
