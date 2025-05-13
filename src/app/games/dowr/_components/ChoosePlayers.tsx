"use client";

import useDowrGame from "../_hooks/useDowrGameProvider";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { NUMBER_OF_PLAYERS } from "../_constants/dowrPlayer";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DowrChoosePlayer } from "../dowrGame-types";
import CircleUsers from "./showUsers/CircleUsers";
import ChooseWords from "./showUsers/ChooseWords";

const ChoosePlayers = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const methods = useForm<DowrChoosePlayer>({
    defaultValues: {
      players: Array(4).fill({ name: "" }),
    },
  });
  const { watch, setValue, handleSubmit } = methods;
  // const players = watch("players");

  const { setWordsDifficulty, setGameStep, setPlayers } = useDowrGame();

  // Handle number of players change
  const handleNumPlayersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const players = watch("players");
    const newNumPlayers = parseInt(event.target.value);
    setNumberOfPlayers(newNumPlayers);
    // If the number of players is increased, append new empty fields
    const temp = [...watch("players")];
    if (newNumPlayers > players.length) {
      for (let i = players.length; i < newNumPlayers; i++) {
        temp.push({ name: "" });
      }
    }

    // If the number of players is decreased, remove fields
    if (newNumPlayers < players.length) {
      for (let i = players.length; i > newNumPlayers; i--) {
        temp.pop();
      }
    }
    setValue("players", temp);
  };

  function onSubmitForm(values: DowrChoosePlayer) {
    console.log({ values });
    setWordsDifficulty(values.difficulty);
    setPlayers(values.players?.map((player) => player.name));
    setGameStep("in game");
  }

  return (
    <div className="container max-w-lg mx-auto p-2">
      <UserInputWrapper label="تعداد ">
        <select value={numberOfPlayers} onChange={handleNumPlayersChange}>
          {NUMBER_OF_PLAYERS.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </UserInputWrapper>
      <FormProvider {...methods}>
        <form
          className="mx-auto max-w-lg"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <CircleUsers />
          <ChooseWords />
          <div className="w-full mt-4 px-4">
            <button
              type="submit"
              className="btn btn-outline btn-primary w-full"
            >
              شروع
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChoosePlayers;
