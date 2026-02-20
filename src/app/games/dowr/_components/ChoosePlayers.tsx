"use client";

import useDowrGame from "../_hooks/useDowrGameProvider";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { NUMBER_OF_PLAYERS } from "../_constants/dowrPlayer";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DowrChoosePlayer } from "../dowrGame-types";
import CircleUsers from "./showUsers/CircleUsers";
import ChooseWords from "./showUsers/ChooseWords";
import { Button } from "@/components/ui/button";

const ChoosePlayers = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const methods = useForm<DowrChoosePlayer>({
    defaultValues: {
      players: Array(4).fill({ name: "" }),
    },
  });
  const { watch, setValue, handleSubmit } = methods;

  const { setWordsDifficulty, setGameStep, setPlayers } = useDowrGame();

  const handleNumPlayersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const players = watch("players");
    const newNumPlayers = parseInt(event.target.value);
    setNumberOfPlayers(newNumPlayers);
    const temp = [...watch("players")];
    if (newNumPlayers > players.length) {
      for (let i = players.length; i < newNumPlayers; i++) {
        temp.push({ name: "" });
      }
    }

    if (newNumPlayers < players.length) {
      for (let i = players.length; i > newNumPlayers; i--) {
        temp.pop();
      }
    }
    setValue("players", temp);
  };

  function onSubmitForm(values: DowrChoosePlayer) {
    setWordsDifficulty(values.difficulty);
    setPlayers(values.players?.map((player) => player.name));
    setGameStep("in game");
  }

  return (
    <div className="container max-w-lg mx-auto p-2">
      <UserInputWrapper label="????? ">
        <select
          value={numberOfPlayers}
          onChange={handleNumPlayersChange}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
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
            <Button type="submit" variant="outline" className="w-full">
              ????
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChoosePlayers;
