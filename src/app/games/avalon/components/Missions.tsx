import React from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";

const Missions = () => {
  const { players, currentMission, missions } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];

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
                    ${
                      mission.result === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
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
  return [1, 2, 3, 4, 5].map((missionNumber) => (
    <MissionCard key={missionNumber} missionNumber={missionNumber} />
  ));
};

export default Missions;
