"use client";
import React, { useState } from "react";
import { useAvalonGame } from "../AvalonProvider";

// Mission requirements for different player counts
const MISSION_REQUIREMENTS = {
  5: { team: [2, 3, 2, 3, 3], fails: [1, 1, 1, 1, 1] },
  6: { team: [2, 3, 4, 3, 4], fails: [1, 1, 1, 1, 1] },
  7: { team: [2, 3, 3, 4, 4], fails: [1, 1, 1, 2, 1] },
  8: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
  9: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
  10: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
};

const InGame = () => {
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

  // Local states
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [missionVotes, setMissionVotes] = useState<Record<string, boolean>>({});
  const [showVoteCard, setShowVoteCard] = useState(false);

  // Get mission requirements for current player count
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];
  const currentMissionTeamSize = requirements.team[currentMission - 1];
  const requiredFails = requirements.fails[currentMission - 1];

  const handleTeamSelection = (playerName: string) => {
    setSelectedTeam((prev) => {
      if (prev.includes(playerName)) {
        return prev.filter((name) => name !== playerName);
      }
      if (prev.length < currentMissionTeamSize) {
        return [...prev, playerName];
      }
      return prev;
    });
  };

  const handleProposeTeam = () => {
    if (selectedTeam.length === currentMissionTeamSize) {
      setCurrentProposal({
        leader: players[leaderIndex].playerName,
        team: selectedTeam,
        votes: {},
      });
      setShowVoteCard(true);
    }
  };

  const handleMissionVote = (playerName: string, vote: boolean) => {
    setMissionVotes((prev) => ({
      ...prev,
      [playerName]: vote,
    }));
  };

  const handleSubmitMissionVotes = () => {
    // Count fails
    const failCount = Object.values(missionVotes).filter(
      (vote) => !vote
    ).length;
    const missionSuccess = failCount < requiredFails;

    // Update missions array
    const newMissions = [...missions];
    newMissions[currentMission - 1] = {
      teamSize: currentMissionTeamSize,
      requiredFails,
      result: missionSuccess ? "success" : "fail",
      team: selectedTeam,
      votes: missionVotes,
    };

    setMissions(newMissions);
    setShowVoteCard(false);
    setMissionVotes({});
    setSelectedTeam([]);

    // Move to next mission or end game
    if (currentMission < 5) {
      setCurrentMission(currentMission + 1);
      setLeaderIndex((leaderIndex + 1) % players.length);
    } else {
      // Game ends, handle end game logic
      const successCount = newMissions.filter(
        (m) => m?.result === "success"
      ).length;
      if (successCount >= 3) {
        // Good team wins, but Assassin gets a chance
        // TODO: Handle assassination phase
      } else {
        // Evil team wins
        // TODO: Handle evil victory
      }
    }
  };

  const MissionVoteCard = () => {
    const isTeamMember = currentProposal?.team.includes(
      players[leaderIndex].playerName
    );

    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {isTeamMember ? "Vote on Mission" : "Waiting for Mission Votes"}
        </h3>

        {isTeamMember && !missionVotes[players[leaderIndex].playerName] && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Choose whether to make the mission succeed or fail
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  handleMissionVote(players[leaderIndex].playerName, true)
                }
                className="p-4 rounded-lg border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* <img
                    src="/images/avalon/chooseSuccess.png"
                    alt="Success"
                    className="w-16 h-16"
                  /> */}
                  <p className="font-medium text-green-600">Success</p>
                </div>
              </button>
              <button
                onClick={() =>
                  handleMissionVote(players[leaderIndex].playerName, false)
                }
                className="p-4 rounded-lg border-2 border-red-200 hover:border-red-500 hover:bg-red-50 transition-all"
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* <img
                    src="/images/avalon/chooseDefeat.png"
                    alt="Fail"
                    className="w-16 h-16"
                  /> */}
                  <p className="font-medium text-red-600">Fail</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {isTeamMember && missionVotes[players[leaderIndex].playerName] && (
          <p className="text-center text-gray-600">
            Vote submitted. Waiting for other players...
          </p>
        )}

        {/* Show submit button only when all votes are in */}
        {Object.keys(missionVotes).length === currentProposal?.team.length && (
          <button
            onClick={handleSubmitMissionVotes}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reveal Mission Result
          </button>
        )}
      </div>
    );
  };

  const MissionCard = ({ missionNumber }: { missionNumber: number }) => {
    const mission = missions[missionNumber - 1];
    const isCurrentMission = currentMission === missionNumber;
    const teamSize = requirements.team[missionNumber - 1];
    const requiredFails = requirements.fails[missionNumber - 1];

    return (
      <div
        className={`
          relative p-4 rounded-xl shadow-lg
          ${
            isCurrentMission
              ? "bg-blue-50 border-2 border-blue-500"
              : "bg-white"
          }
          ${mission?.result === "success" ? "bg-green-50" : ""}
          ${mission?.result === "fail" ? "bg-red-50" : ""}
        `}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Mission {missionNumber}</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Team Size: {teamSize}</p>
            <p className="text-sm text-gray-600">
              Required Fails: {requiredFails}
            </p>
          </div>
          {mission?.result && (
            <div
              className={`
                mt-3 py-1 px-2 rounded-full text-white text-sm font-medium
                ${mission.result === "success" ? "bg-green-500" : "bg-red-500"}
              `}
            >
              {mission.result === "success" ? "Success" : "Failed"}
            </div>
          )}
        </div>

        {isCurrentMission && (
          <div className="absolute -top-2 -right-2">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </span>
          </div>
        )}
      </div>
    );
  };

  const TeamSelection = () => {
    const isLeader =
      leaderIndex ===
      players.findIndex(
        (p) => p.playerName === players[leaderIndex].playerName
      );

    if (showVoteCard) {
      return <MissionVoteCard />;
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {isLeader ? "Select Team Members" : "Waiting for Team Proposal"}
        </h3>

        {isLeader && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Select {currentMissionTeamSize} players for the mission
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {players.map((player) => (
                <button
                  key={player.playerName}
                  onClick={() => handleTeamSelection(player.playerName)}
                  className={`
                    p-3 rounded-lg border-2 transition-all
                    ${
                      selectedTeam.includes(player.playerName)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-base font-semibold text-center">
                      {player.playerName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleProposeTeam}
              disabled={selectedTeam.length !== currentMissionTeamSize}
              className={`
                w-full py-3 rounded-lg font-medium transition-colors
                ${
                  selectedTeam.length === currentMissionTeamSize
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Propose Team
            </button>
          </>
        )}
      </div>
    );
  };

  const CurrentLeader = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Current Leader</h3>
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium">{players[leaderIndex].playerName}</p>
          <p className="text-sm text-gray-500">
            Proposing team for Mission {currentMission}
          </p>
        </div>
      </div>
    </div>
  );

  const MissionProgress = () => {
    const successCount = missions.filter((m) => m?.result === "success").length;
    const failCount = missions.filter((m) => m?.result === "fail").length;

    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Mission Progress</h3>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{successCount}</p>
            <p className="text-sm text-gray-500">Successes</p>
          </div>
          <div className="text-4xl text-gray-300">vs</div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{failCount}</p>
            <p className="text-sm text-gray-500">Failures</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Avalon</h1>
          <p className="text-center text-gray-600">
            Mission {currentMission} of 5
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CurrentLeader />
            <TeamSelection />
            <MissionProgress />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((missionNumber) => (
              <MissionCard key={missionNumber} missionNumber={missionNumber} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InGame;
