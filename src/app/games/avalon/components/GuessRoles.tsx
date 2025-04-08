import React, { useEffect, useState } from "react";
import { useAvalonGame } from "../AvalonProvider";
import { AvalonPlayer } from "../avalon-types";

const GuessRoles = () => {
  const { winner, setWinner, setGameStep, players } = useAvalonGame();
  useEffect(() => {
    if (players.length !== 10 && winner === "good") {
      setGameStep("show-result");
    }
  }, [players?.length, setGameStep, winner]);

  return (
    <div
      className={`h-full ${winner === "evil" ? "bg-red-200" : "bg-green-200"}`}
    >
      <h5
        className={`text-center ${
          winner === "evil" ? "text-red-500" : "text-green-500"
        }`}
      >
        تیم
        {winner === "evil" ? " شر " : " خیر "}
        در ماموریت ها پیروز شد
      </h5>

      {winner === "evil" && (
        <GuessAllDevils
          handleOnGuess={(isCorrect) => {
            setWinner(isCorrect ? "good" : "evil");
          }}
        />
      )}
      {winner === "good" && (
        <GuessMerlin
          handleOnGuess={(isCorrect) => {
            setWinner(isCorrect ? "evil" : "good");
            setGameStep("show-result");
          }}
        />
      )}
    </div>
  );
};

export default GuessRoles;

type GuessMerlinProps = {
  handleOnGuess: (isCorrect: boolean) => void;
};
const GuessMerlin = ({ handleOnGuess }: GuessMerlinProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<
    AvalonPlayer | undefined
  >(undefined);
  const { players } = useAvalonGame();

  return (
    <div>
      <div className="flex items-center gap-1">
        {players
          .filter((p) => !p.isEvil)
          .map((p) => (
            <div
              key={p.playerName}
              onClick={() => setSelectedPlayer(p)}
              className={`p-1 border border-slate-300 rounded-md transition-all ${
                selectedPlayer?.playerName === p.playerName
                  ? "scale-105 border-blue-400 "
                  : ""
              }`}
            >
              {p.playerName}
            </div>
          ))}
      </div>

      <button
        disabled={!Boolean(selectedPlayer)}
        onClick={() => {
          handleOnGuess(selectedPlayer?.roleName === "Merlin");
        }}
      >
        انتخاب
      </button>
    </div>
  );
};

type GuessAllDevilsProps = {
  handleOnGuess: (isCorrect: boolean) => void;
};
const GuessAllDevils = ({ handleOnGuess }: GuessAllDevilsProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<AvalonPlayer[]>([]);
  const { players } = useAvalonGame();
  const numberOfEvils = players.reduce((acc, cur) => {
    if (cur.isEvil) {
      return acc++;
    }
    return acc;
  }, 0);

  return (
    <div>
      <div className="flex items-center gap-1">
        {players.map((p) => {
          //TODO: get all evils guess characters, add style, show the result of game at the end
          const isSelected = Boolean(
            selectedPlayers.find((sp) => sp.playerName === p.playerName)
          );
          return (
            <div
              key={p.playerName}
              onClick={() => {
                const index = selectedPlayers.findIndex(
                  (sp) => sp.playerName === p.playerName
                );
                if (index > -1) {
                  // setSelectedPlayers()
                }
              }}
              className={`p-1 border border-slate-300 rounded-md transition-all ${
                isSelected ? "scale-105 border-blue-400 " : ""
              }`}
            >
              {p.playerName}
            </div>
          );
        })}
      </div>

      <button
        disabled={!Boolean(selectedPlayers)}
        onClick={() => {
          // handleOnGuess(selectedPlayers?.roleName === "Merlin");
        }}
      >
        انتخاب
      </button>
    </div>
  );
};
