import React from "react";
import { useAvalonGame } from "../AvalonProvider";
import Image from "next/image";

const GameResult = () => {
  const { missions, winner, players, resetGame } = useAvalonGame();
  const isEvilWin = winner === "evil";
  return (
    <div className="h-full w-full">
      <h3
        className={`text-2xl font-bold text-center ${
          isEvilWin ? "text-red-600" : "text-green-600"
        }`}
      >
        تیم
        {isEvilWin ? " شر " : " خیر "}
        برنده بازی است
      </h3>
      <div className="flex flex-col gap-2 items-center justify-center w-full mt-2 p-2">
        {missions.map((mission, i) => {
          if (mission.result && mission.votes) {
            const isSuccess = mission.result === "success";
            return (
              <div
                key={i}
                className={`${
                  isSuccess
                    ? "bg-green-200 border-green-400"
                    : "bg-red-200 border-red-400"
                } border rounded-sm flex flex-wrap gap-6 items-center justify-start p-2 w-full`}
              >
                {/* <Image
                  src={`/images/avalon/${
                    isSuccess ? "successBg.webp" : "failureBg.webp"
                  }`}
                  alt={"avalon bg"}
                  width={500}
                  height={600}
                  className={`object-cover absolute top-0 left-0 w-full h-full `}
                /> */}
                <h1 className="text-xl font-bold">
                  ماموریت {(i + 1).toLocaleString("fa")}.
                </h1>

                <div className="flex flex-wrap items-center gap-2">
                  {Object.keys(mission.votes).map((player) => (
                    <div
                      key={player}
                      className={`${
                        mission.votes![player] ? "bg-green-400" : "bg-red-400"
                      } p-2 rounded-md`}
                    >
                      {player}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center mt-4">
        {players.map((player) => (
          <div
            key={player.playerName}
            className={`flex flex-col gap-1 justify-center items-center ${
              player.isEvil ? "bg-red-400" : "bg-blue-400"
            } px-2 py-1 rounded-md h-full`}
          >
            <Image
              src={player.imgUrl}
              alt={player.roleName}
              className="rounded-t-xl"
              width={90}
              height={90}
            />
            <span className="text-sm">{player.roleName}</span>
            <span className="text-sm font-bold">{player.playerName}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center  mt-4  ">
        <button
          className="text-base border border-slate-600  cursor-pointer py-2 px-4 rounded-lg"
          onClick={() => resetGame()}
        >
          دوباره بازی کنید
        </button>
      </div>
    </div>
  );
};

export default GameResult;
