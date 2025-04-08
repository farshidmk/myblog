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
});

type Props = {
  children: React.ReactNode;
};

const AvalonProvider = ({ children }: Props) => {
  // Basic game state
  // const [players, setPlayers] = useState<AvalonPlayer[]>(mockPlayers);
  const [players, setPlayers] = useState<AvalonPlayer[]>([]);
  const [gameStep, setGameStep] =
    // useState<AvalonContext["gameStep"]>("in-game");
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

const mockPlayers: AvalonPlayer[] = [
  {
    playerName: "1",
    roleName: "Morgana",
    isEvil: true,
    imgUrl: "/images/avalon/morgana.png",
  },
  {
    playerName: "2",
    roleName: "Mordred",
    isEvil: true,
    imgUrl: "/images/avalon/mordred.png",
  },
  {
    playerName: "3",
    roleName: "Percival",
    isEvil: false,
    imgUrl: "/images/avalon/percival.png",
  },
  {
    playerName: "4",
    roleName: "Oberon",
    isEvil: true,
    imgUrl: "/images/avalon/oberon.png",
  },
  {
    playerName: "5",
    roleName: "Loyal Servant",
    isEvil: false,
    imgUrl: "/images/avalon/loyalServant.png",
  },
  {
    playerName: "6",
    roleName: "Assassin",
    isEvil: true,
    imgUrl: "/images/avalon/assassin.png",
  },
  {
    playerName: "7",
    roleName: "Merlin",
    isEvil: false,
    imgUrl: "/images/avalon/merlin.png",
  },
  {
    playerName: "8",
    roleName: "King Arthur",
    isEvil: false,
    imgUrl: "/images/avalon/kingArthur.png",
  },
  {
    playerName: "9",
    roleName: "Loyal Servant",
    isEvil: false,
    imgUrl: "/images/avalon/loyalServant.png",
  },
  {
    playerName: "10",
    roleName: "Loyal Servant",
    isEvil: false,
    imgUrl: "/images/avalon/loyalServant.png",
  },
];
