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
      className={`h-full ${
        winner === "evil" ? "bg-red-200" : "bg-green-200"
      } p-2`}
    >
      <h5
        className={`text-center text-2xl font-bold  ${
          winner === "evil" ? "text-red-600" : "text-green-600"
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
      <h6 className="text-xl text-red-400">
        تیم شر اگر مرلین را شناسایی کند برنده بازی است
      </h6>
      <h6 className="text-base font-semibold">مرلین کدام بازیکن است؟</h6>
      <div className="flex items-center gap-2 flex-wrap">
        {players
          .filter((p) => !p.isEvil)
          .map((p) => (
            <div
              key={p.playerName}
              onClick={() => setSelectedPlayer(p)}
              className={`p-2 border border-slate-300 rounded-md transition-all cursor-pointer min-w-20 ${
                selectedPlayer?.playerName === p.playerName
                  ? "scale-110 border-blue-600 border-2 bg-blue-100"
                  : ""
              }`}
            >
              {p.playerName}
            </div>
          ))}
      </div>

      <div className="flex justify-center items-center w-full">
        <button
          className="bg-blue-300 p-2 rounded-lg cursor-pointer"
          disabled={!Boolean(selectedPlayer)}
          onClick={() => {
            handleOnGuess(selectedPlayer?.roleName === "Merlin");
          }}
        >
          انتخاب
        </button>
      </div>
    </div>
  );
};

type GuessAllDevilsProps = {
  handleOnGuess: (isCorrect: boolean) => void;
};
const GuessAllDevils = ({ handleOnGuess }: GuessAllDevilsProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<AvalonPlayer[]>([]);
  const { players } = useAvalonGame();
  const kingArthur = players.find(
    (player) => player.roleName === "King Arthur"
  );

  return (
    <div>
      <h6 className="text-base text-red-500">
        {`${kingArthur?.playerName} (${kingArthur?.roleName}) باید تمام بازیکنان شر را شناسایی کند`}
      </h6>
      <div className="flex flex-wrap items-center gap-1">
        {players.map((player) => {
          const isSelected = Boolean(
            selectedPlayers.find((sp) => sp.playerName === player.playerName)
          );
          return (
            <div
              key={player.playerName}
              onClick={() => {
                const index = selectedPlayers.findIndex(
                  (sp) => sp.playerName === player.playerName
                );
                if (index > -1) {
                  setSelectedPlayers((p) => {
                    const temp = [...p];
                    temp.slice(index, 1);
                    return temp;
                  });
                } else if (selectedPlayers.length < 4) {
                  setSelectedPlayers((p) => [...p, player]);
                }
              }}
              className={`p-2 border border-slate-300 rounded-md transition-all cursor-pointer min-w-20 ${
                isSelected
                  ? "scale-110 border-blue-600 border-2 bg-blue-100"
                  : ""
              }`}
            >
              {player.playerName}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center w-full mt-2">
        <button
          className="bg-blue-300 p-2 rounded-lg cursor-pointer"
          disabled={selectedPlayers.length !== 4}
          onClick={() => {
            handleOnGuess(
              selectedPlayers.filter((sp) => sp.isEvil).length === 4
            );
          }}
        >
          انتخاب
        </button>
      </div>
    </div>
  );
};
