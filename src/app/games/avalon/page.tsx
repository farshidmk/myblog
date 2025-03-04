"use client";
import React from "react";
import { useAvalonGame } from "./AvalonProvider";
import ChoosePlayers from "./components/ChoosePlayers";

//https://tgmafia.com/how-play-avalon/

const AvalonGame = () => {
  const { gameStep } = useAvalonGame();
  return (
    <div>{gameStep === "choose-players" ? <ChoosePlayers /> : "avalon"}</div>
  );
};

export default AvalonGame;
