"use client";
import useDowrGame from "./_hooks/useDowrGameProvider";

const DowrGamePage = () => {
  const { gameStep } = useDowrGame();
  switch (gameStep) {
    case "choose players":
      break;

    default:
      break;
  }
};

export default DowrGamePage;
