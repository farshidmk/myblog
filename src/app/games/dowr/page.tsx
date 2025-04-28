"use client";
import ChoosePlayers from "./_components/ChoosePlayers";
import useDowrGame from "./_hooks/useDowrGameProvider";

const DowrGamePage = () => {
  const { gameStep } = useDowrGame();
  switch (gameStep) {
    case "choose players":
      return <ChoosePlayers />;

    default:
      break;
  }

  return <div>dowr</div>;
};

export default DowrGamePage;
