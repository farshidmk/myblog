import React, { useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { MISSION_REQUIREMENTS } from "../avalon-shared";
import { CircleHelp } from "lucide-react";
import Image from "next/image";

const Missions = () => {
  return (
    <div className="p-2 flex flex-col gap-2 w-full h-full relative ">
      <Image
        src={"/images/avalon/gameBoardBG.png"}
        alt={"avalon bg"}
        width={500}
        height={600}
        className={`object-cover absolute top-0 left-0 w-full h-full`}
      />
      {[1, 2, 3, 4, 5].map((missionNumber) => (
        <MissionCard key={missionNumber} missionNumber={missionNumber} />
      ))}
    </div>
  );
};

export default Missions;

const MissionCard = ({ missionNumber }: { missionNumber: number }) => {
  const [showInfo, setShowInfo] = useState(false);
  const { players, currentMission, missions } = useAvalonGame();
  const requirements =
    MISSION_REQUIREMENTS[players.length as keyof typeof MISSION_REQUIREMENTS];

  const mission = missions[missionNumber - 1];
  const isCurrentMission = currentMission === missionNumber;
  const teamSize = requirements.team[missionNumber - 1];
  const requiredFails = requirements.fails[missionNumber - 1];

  return (
    <div
      className={`bg-none backdrop-blur-md      
        relative p-4 rounded-xl shadow-lg border-2
      ${isCurrentMission ? " border-blue-500" : " border-blue-950"}
       ${
         mission?.result === "success"
           ? "bg-green-500 border-green-500"
           : mission?.result === "fail"
           ? "bg-red-500 border-red-500"
           : ""
       }
          `}
    >
      <Image
        src={`/images/avalon/${
          mission?.result === "success"
            ? "successBg.webp"
            : mission?.result === "fail"
            ? "failureBg.webp"
            : "gameBoardBG.png"
        }`}
        alt={"avalon bg"}
        width={500}
        height={600}
        className={`object-cover absolute top-0 left-0 w-full h-full -z-20`}
      />
      <div className="text-center">
        <h3
          className={`${
            mission?.result ? "backdrop-blur-sm  p-1 rounded-sm" : ""
          } text-xl font-bold mb-2`}
        >
          ماموریت {missionNumber}
        </h3>
        <div className="space-y-2">
          {mission?.result ? (
            <div className="flex items-center justify-center gap-1 flex-wrap">
              {mission.team?.map((p) => (
                <div key={p} className="p-1 rounded text-xs bg-slate-200">
                  {p}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-900 p-1 bg-gray-300 rounded-sm text-center w-fit">
              تعداد نفرات: {teamSize.toLocaleString("fa")}
            </p>
          )}

          <div
            className={`tooltip tooltip-info tooltip-${
              showInfo ? "open" : "close"
            }`}
            data-tip={`تعداد آرای شکست برای، شکست در این ماموریت ${requiredFails.toLocaleString(
              "fa"
            )}`}
            onClick={() => setShowInfo((p) => !p)}
          >
            <p className="p-1 bg-slate-50/50 border border-red-500 rounded-md text-sm text-red-500 flex justify-center items-center gap-2">
              شکست: {requiredFails.toLocaleString("fa")}
              <span className="bg-amber-300 text-amber-700 text-xs font-bold rounded-full">
                <CircleHelp />
              </span>
            </p>
          </div>
        </div>
        {mission?.result && (
          <div
            className={`
                  mt-3 py-1 px-2 rounded-full text-white text-sm font-medium
                  ${
                    mission.result === "success" ? "bg-green-500" : "bg-red-500"
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
