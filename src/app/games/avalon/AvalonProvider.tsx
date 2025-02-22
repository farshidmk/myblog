import React, { useContext, useState } from "react";
import { AvalonContext, AvalonPlayer } from "./avalon-types";

export const AvalonGameContext = React.createContext<AvalonContext>({
  players: [],
  setPlayers: () => {},
  gameStep: "choose-players",
  setGameStep: () => {},
});
type Props = {
  children: React.ReactNode;
};

const AvalonProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<AvalonPlayer[]>([]);
  const [gameStep, setGameStep] =
    useState<AvalonContext["gameStep"]>("choose-players");
  return (
    <AvalonGameContext.Provider
      value={{
        players,
        setPlayers,
        gameStep,
        setGameStep,
      }}
    >
      {children}
    </AvalonGameContext.Provider>
  );
};

export default AvalonProvider;

export function useAvalonGame() {
  const context = useContext(AvalonGameContext);
  if (context === undefined) {
    throw new Error(`useAvalonGame must be used within a AvalonGameContext`);
  }
  return context;
}
