import React, { useEffect, useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
import Missions from "./Missions";
import TeamSelection from "./TeamSelection";
import VoteCard from "./VoteCard";
import { MISSION_REQUIREMENTS } from "../avalon-shared";
const GameBoard = () => {
  const [showMission, setShowMission] = useState(false);
  const {
    players,
    currentMission,
    missions,
    leaderIndex,
    setLeaderIndex,
    setMissions,
    setCurrentMission,
  } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  const [playersInVote, setPlayersInVote] = useState<string[]>([]);
  useEffect(() => {
    if (showMission) {
      setPlayersInVote(missions[currentMission - 1].team || []);
    }
  }, [currentMission, missions, showMission]);

  useEffect(() => {
    if (leaderIndex === -1) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setLeaderIndex(randomIndex);
    }
  }, [leaderIndex, players.length, setLeaderIndex]);

  /**
   * check the result of the mission and start next mission
   */
  useEffect(() => {
    if (
      showMission &&
      playersInVote.length === 0 &&
      missions &&
      missions[currentMission - 1]?.votes
    ) {
      setShowMission(false);
      /**
       * calculate the result of the mission
       */
      const numberOfDefeatVotes = Object.values(
        missions[currentMission - 1].votes || {}
      ).reduce((acc, curr) => {
        if (!curr) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setMissions((p) => {
        p[currentMission - 1].result =
          numberOfDefeatVotes >= requirements.fails[currentMission - 1]
            ? "fail"
            : "success";
        return p;
      });
      setCurrentMission(currentMission + 1);
    }
  }, [
    currentMission,
    missions,
    playersInVote,
    requirements.fails,
    setCurrentMission,
    setMissions,
    showMission,
  ]);

  return (
    <div
      className="max-w-lg w-full mx-auto relative"
      // style={{
      //   backgroundImage:
      // }}
    >
      <div className="flex gap-2 items-center justify-center">
        <h2 className="text-2xl font-bold">فرمانده: </h2>
        <p className="text-lg">{players[leaderIndex].playerName}</p>
      </div>
      <TeamSelection setShowMission={setShowMission} />
      <Missions />

      {showMission && (
        <VoteCard
          playerName={playersInVote[playersInVote.length - 1]}
          handleSubmitVote={() =>
            setPlayersInVote((players) =>
              players.filter(
                (player) => player !== playersInVote[playersInVote.length - 1]
              )
            )
          }
        />
      )}
    </div>
  );
};

export default GameBoard;
