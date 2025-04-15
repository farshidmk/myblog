"use client";
import React, { useContext, useState } from "react";
import {
  AvalonContext,
  AvalonPlayer,
  Mission,
  TeamProposal,
} from "./avalon-types";

export const AvalonGameContext = React.createContext<AvalonContext>({
  players: [],
  setPlayers: () => {},
  gameStep: "choose-players",
  setGameStep: () => {},
  currentMission: 1,
  setCurrentMission: () => {},
  missions: [],
  setMissions: () => {},
  currentProposal: null,
  setCurrentProposal: () => {},
  failedProposals: 0,
  setFailedProposals: () => {},
  leaderIndex: 0,
  setLeaderIndex: () => {},
  winner: undefined,
  setWinner: () => {},
  resetGame: () => {}, //TODO: reset with sane players
});

type Props = {
  children: React.ReactNode;
};

const AvalonProvider = ({ children }: Props) => {
  // Basic game state
  const [players, setPlayers] = useState<AvalonPlayer[]>([]);
  const [gameStep, setGameStep] =
    useState<AvalonContext["gameStep"]>("choose-players");

  const [winner, setWinner] = useState<AvalonContext["winner"]>(undefined);

  // Mission tracking
  const [currentMission, setCurrentMission] = useState<number>(1);
  const [missions, setMissions] = useState<Mission[]>([]);

  // Team proposal tracking
  const [currentProposal, setCurrentProposal] = useState<TeamProposal | null>(
    null
  );
  const [failedProposals, setFailedProposals] = useState<number>(0);
  const [leaderIndex, setLeaderIndex] = useState<number>(0);

  function resetGame() {
    setPlayers([]);
    setGameStep("choose-players");
    setWinner(undefined);
    setCurrentMission(1);
    setMissions([]);
    setCurrentProposal(null);
    setFailedProposals(0);
    setLeaderIndex(0);
  }

  return (
    <AvalonGameContext.Provider
      value={{
        players,
        setPlayers,
        gameStep,
        setGameStep,
        currentMission,
        setCurrentMission,
        missions,
        setMissions,
        currentProposal,
        setCurrentProposal,
        failedProposals,
        setFailedProposals,
        leaderIndex,
        setLeaderIndex,
        winner,
        setWinner,
        resetGame,
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
