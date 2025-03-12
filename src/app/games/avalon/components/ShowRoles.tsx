"use client";
import React, { useState, useEffect } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { AvalonPlayer } from "../avalon-types";
import Image from "next/image";

const ShowRoles = () => {
  const { players, setGameStep } = useAvalonGame();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const [showSound, setShowSound] = useState<HTMLAudioElement | null>(null);
  const [hideSound, setHideSound] = useState<HTMLAudioElement | null>(null);
  //   const [seenRoles, setSeenRoles] = useState<number[]>([]);

  useEffect(() => {
    // Initialize sound effects
    setShowSound(new Audio("/sounds/avalon/show.mp3"));
    setHideSound(new Audio("/sounds/avalon/hide.mp3"));
  }, []);

  const currentPlayer = players[currentPlayerIndex];

  const getTeammates = (player: AvalonPlayer): AvalonPlayer[] => {
    if (player.roleName === "Merlin") {
      // Merlin sees all evil players except Mordred
      return players.filter((p) => p.isEvil && p.roleName !== "Mordred");
    }
    if (player.isEvil) {
      // Evil players see other evil players except Oberon
      return players.filter(
        (p) =>
          p.isEvil &&
          p.roleName !== "Oberon" &&
          p.playerName !== player.playerName
      );
    }
    if (player.roleName === "Percival") {
      // Percival sees Merlin and Morgana
      return players.filter(
        (p) => p.roleName === "Merlin" || p.roleName === "Morgana"
      );
    }
    return [];
  };

  const handleShowRole = () => {
    showSound?.play();
    setIsRoleVisible(true);
    // if (!seenRoles.includes(currentPlayerIndex)) {
    //   setSeenRoles([...seenRoles, currentPlayerIndex]);
    // }
  };

  const handleHideRole = () => {
    hideSound?.play();
    setIsRoleVisible(false);
  };

  const handleNextPlayer = () => {
    setIsRoleVisible(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex((prev) => prev + 1);
    } else {
      // All players have seen their roles
      setGameStep("in-game");
    }
  };

  const RoleDisplay = ({
    player,
    teammates,
  }: {
    player: AvalonPlayer;
    teammates: AvalonPlayer[];
  }) => (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={player.imgUrl}
          alt={player.roleName}
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
        />
        <h3 className="text-xl font-semibold">{player.roleName}</h3>
        <p
          className={`text-lg ${
            player.isEvil ? "text-red-600" : "text-blue-600"
          }`}
        >
          {player.isEvil ? "Evil Team" : "Good Team"}
        </p>
      </div>

      {teammates.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">You can see:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {teammates.map((teammate) => (
              <div
                key={teammate.playerName}
                className="flex flex-col items-center p-2 bg-gray-50 rounded-lg"
              >
                <Image
                  src={teammate.imgUrl}
                  alt={teammate.roleName}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p className="text-sm font-medium mt-1">
                  {teammate.playerName}
                </p>
                <p className="text-xs text-gray-600">{teammate.roleName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Current player role view */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {currentPlayer.playerName}&apos;s Turn
            </h2>
            <p className="text-gray-600">
              {isRoleVisible
                ? "Remember your role and teammates!"
                : "Press the button to see your role"}
            </p>
          </div>

          {!isRoleVisible ? (
            <div className="space-y-4">
              <button
                onClick={handleShowRole}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show My Role
              </button>
              {currentPlayerIndex > 0 && (
                <button
                  onClick={() => {
                    setCurrentPlayerIndex((prev) => prev - 1);
                    setIsRoleVisible(false);
                  }}
                  className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back to {players[currentPlayerIndex - 1].playerName}&apos;s
                  Role
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <RoleDisplay
                player={currentPlayer}
                teammates={getTeammates(currentPlayer)}
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleHideRole}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hide Role
                </button>
                <button
                  onClick={handleNextPlayer}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {currentPlayerIndex < players.length - 1
                    ? "Next Player"
                    : "Start Game"}
                </button>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            Player {currentPlayerIndex + 1} of {players.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRoles;
