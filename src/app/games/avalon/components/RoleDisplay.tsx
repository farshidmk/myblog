import React from "react";
import { AvalonPlayer } from "../avalon-types";
import Image from "next/image";
import { ROLE_DESCRIPTIONS } from "../avalon-shared";

const RoleDisplay = ({
  player,
  teammates,
}: {
  player: AvalonPlayer;
  teammates: AvalonPlayer[];
}) => {
  const isEvil = player.isEvil;
  return (
    <div className="">
      <div className="flex flex-col items-center gap-1">
        <Image
          src={player.imgUrl}
          alt={player.roleName}
          width={112}
          height={112}
          className={`w-28 h-28 object-cover rounded-full border-4 ${
            isEvil ? "border-red-500" : "border-blue-500"
          }`}
        />
        <h3
          className={`text-lg font-bold ${
            isEvil ? "text-red-800" : "text-blue-800"
          }`}
        >
          {player.roleName}
        </h3>
        <p
          className={`text-xs ${
            isEvil ? "text-red-600" : "text-blue-600"
          } mb-1`}
        >
          {isEvil ? "Evil Team" : "Good Team"}
        </p>
      </div>
      <div
        className={`text-base border rounded-md p-1 text-center ${
          isEvil ? "border-red-600 bg-red-50" : "border-blue-600 bg-blue-50"
        }`}
      >
        {ROLE_DESCRIPTIONS[player.roleName]}
      </div>
      {teammates.length > 0 && (
        <div className="">
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 mt-1">
            {teammates.map((teammate) => (
              <div
                key={teammate.playerName}
                className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg"
              >
                {player.roleName !== "Percival" && (
                  <>
                    <Image
                      src={teammate.imgUrl}
                      alt={teammate.roleName}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <p className="text-xs text-gray-600">{teammate.roleName}</p>
                  </>
                )}
                <p className="text-sm font-medium mt-1">
                  {teammate.playerName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleDisplay;
