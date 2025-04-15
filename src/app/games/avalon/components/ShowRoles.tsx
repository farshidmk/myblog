"use client";
import React, { useState, useEffect } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { AvalonPlayer } from "../avalon-types";
import RoleDisplay from "./RoleDisplay";
import { ArrowLeft, ArrowRight, Eye, EyeClosed, Play } from "lucide-react";

const ShowRoles = () => {
  const { players, setGameStep } = useAvalonGame();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const [showSound, setShowSound] = useState<HTMLAudioElement | null>(null);
  const [hideSound, setHideSound] = useState<HTMLAudioElement | null>(null);
  const [nextPlayerSound, setNextPlayerSound] =
    useState<HTMLAudioElement | null>(null);
  const [previousPlayerSound, setPreviousPlayerSound] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize sound effects
    setShowSound(new Audio("/sounds/avalon/show.mp3"));
    setHideSound(new Audio("/sounds/avalon/hide.mp3"));
    setNextPlayerSound(new Audio("/sounds/avalon/next-player.wav"));
    setPreviousPlayerSound(new Audio("/sounds/avalon/previous-player.wav"));
  }, []);

  const currentPlayer = players[currentPlayerIndex];

  const getTeammates = (player: AvalonPlayer): AvalonPlayer[] => {
    if (player.roleName === "Merlin") {
      // Merlin sees all evil players except Mordred
      return players.filter((p) => p.isEvil && p.roleName !== "Mordred");
    }
    if (player.isEvil) {
      // Evil players see other evil players except Oberon
      if (player.roleName === "Oberon") {
        return [];
      }
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
    nextPlayerSound?.play();
    setIsRoleVisible(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex((prev) => prev + 1);
    } else {
      // All players have seen their roles
      setGameStep("in-game");
    }
  };

  return (
    <div className="min-h-screen flex  bg-gray-100 p-2">
      <div className="max-w-lg w-full space-y-1">
        {/* Current player role view */}
        <div className="bg-white rounded-xl shadow-lg p-4 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-extrabold mb-2">
              {currentPlayer.playerName}
            </h2>
            <p className="text-gray-600">
              {isRoleVisible
                ? "نقش خود و تیمتان را به خاطر بسپارید"
                : "برای نمایش نقش خود روی دکمه زیر کلیک کنید"}
            </p>
          </div>

          {isRoleVisible ? (
            <div className="space-y-2">
              <RoleDisplay
                player={currentPlayer}
                teammates={getTeammates(currentPlayer)}
              />
              <div className="flex space-x-4 gap-2">
                <button
                  onClick={handleHideRole}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <EyeClosed />
                  بستن نقش
                </button>
                <button
                  onClick={handleNextPlayer}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {currentPlayerIndex < players.length - 1 ? (
                    <>
                      <ArrowRight />
                      بازیکن بعدی
                    </>
                  ) : (
                    <>
                      شروع بازی
                      <Play />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleShowRole}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Eye />
                نمایش نقش
              </button>
              <button
                onClick={handleNextPlayer}
                className="w-full py-3 border border-green-600 text-green-600 rounded-lg  transition-colors flex items-center justify-center gap-2"
              >
                {currentPlayerIndex < players.length - 1 ? (
                  <>
                    <ArrowRight />
                    بازیکن بعدی
                  </>
                ) : (
                  <>
                    شروع بازی
                    <Play />
                  </>
                )}
              </button>
              {currentPlayerIndex > 0 && (
                <button
                  onClick={() => {
                    previousPlayerSound?.play();
                    setCurrentPlayerIndex((prev) => prev - 1);
                    setIsRoleVisible(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  بازگشت به نقش {players[currentPlayerIndex - 1].playerName}
                  <ArrowLeft />
                </button>
              )}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            بازیکن {(currentPlayerIndex + 1).toLocaleString("fa")} از{" "}
            {players.length.toLocaleString("fa")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRoles;
