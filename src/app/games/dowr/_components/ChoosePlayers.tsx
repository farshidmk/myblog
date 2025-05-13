"use client";

import { useQuery } from "@tanstack/react-query";
import useDowrGame from "../_hooks/useDowrGameProvider";
import { GameWordCategory } from "@prisma/client";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { NUMBER_OF_PLAYERS } from "../_constants/dowrPlayer";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { DowrChoosePlayer } from "../dowrGame-types";
import CircleUsers from "./showUsers/CircleUsers";

const ChoosePlayers = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const methods = useForm<DowrChoosePlayer>({
    defaultValues: {
      players: Array(4).fill({ name: "" }),
    },
  });
  const { watch, control, setValue } = methods;
  // const players = watch("players");
  const { append, remove, fields } = useFieldArray({
    control,
    name: "players",
  });

  const { setWordsDifficulty, setGameStep, setPlayers } = useDowrGame();
  // const { data, status } = useQuery<
  //   ActionResponse<GameWordCategory[]>,
  //   Error,
  //   GameWordCategory[]
  // >({
  //   queryKey: ["/api/games/category"],
  //   select: (res) => res.data || [],
  // });

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
    console.log({ fields });
  };

  return (
    <div>
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
        <form className="mx-auto max-w-lg colum">
          <div className="grid grid-cols-2"></div>

          <CircleUsers />
        </form>
      </FormProvider>
    </div>
  );
};

export default ChoosePlayers;
