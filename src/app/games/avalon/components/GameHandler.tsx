"use client";
import React from "react";
import { useAvalonGame } from "../AvalonProvider";
import ChoosePlayers from "./ChoosePlayers";
import ShowRoles from "./ShowRoles";
import GameBoard from "./GameBoard";
import GuessRoles from "./GuessRoles";
import GameResult from "./GameResult";

const GameHandler = () => {
  const { gameStep } = useAvalonGame();

  const renderGameStep = () => {
    switch (gameStep) {
      case "choose-players":
        return <ChoosePlayers />;
      case "show-roles":
        return <ShowRoles />;
      case "in-game":
        return <GameBoard />;
      case "guess-role":
        return <GuessRoles />;
      case "show-result":
        return <GameResult />;
      default:
        return <div>Unknown game state</div>;
    }
  };

  return <div className="min-h-screen bg-gray-100">{renderGameStep()}</div>;
};

export default GameHandler;
