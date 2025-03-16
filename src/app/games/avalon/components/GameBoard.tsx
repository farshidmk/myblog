import React, { useEffect, useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
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
    setLeaderIndex,
  } = useAvalonGame();
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
    <div
      className="max-w-lg w-full mx-auto"
      // style={{
      //   backgroundImage:
      // }}
    >
      <div className="flex gap-2 items-center justify-center">
        <h2 className="text-2xl font-bold">لیدر: </h2>
        <p className="text-lg">{players[leaderIndex].playerName}</p>
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
