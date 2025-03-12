"use client";
import React from "react";
import { useAvalonGame } from "./AvalonProvider";
import ChoosePlayers from "./components/ChoosePlayers";
import ShowRoles from "./components/ShowRoles";
// import InGame from "./components/InGame";
import GameBoard from "./components/GameBoard";

//https://tgmafia.com/how-play-avalon/

const AvalonGame = () => {
  const { gameStep } = useAvalonGame();

  const renderGameStep = () => {
    switch (gameStep) {
      case "choose-players":
        return <ChoosePlayers />;
      case "show-roles":
        return <ShowRoles />;
      case "in-game":
        return <GameBoard />;
      // case "in-game":
      //   return <InGame />;
      case "show-result":
        return <div>Game results...</div>;
      default:
        return <div>Unknown game state</div>;
    }
  };

  return <div className="min-h-screen bg-gray-100">{renderGameStep()}</div>;
};

export default AvalonGame;
