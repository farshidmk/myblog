"use client";
import { useState } from "react";
// import { useAvalonGame } from '../AvalonProvider';
import { AVALON_ROLES } from "../avalon-shared";
import CharacterCard from "./CharacterCard";
import { Controller, useForm } from "react-hook-form";

type ChoosePlayersFormType = {
  numberOfPlayers: number;
  players: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
};

const SelectPlayers = () => {
  // const [playersName, setPlayersName] = useState([]);
  const [numberOfPlayers] = useState(5);
  const {
    handleSubmit,
    control,
    // formState: { errors },
    register,
    watch,
  } = useForm<ChoosePlayersFormType>({
    defaultValues: {
      numberOfPlayers: 5,
      players: [],
    },
  });

  function onSubmit(data: ChoosePlayersFormType) {
    console.log({ data });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="w-112">
          <div className="relative border border-gray-300 text-gray-800 bg-white shadow-lg">
            <label htmlFor="frm-whatever" className="sr-only">
              Number of players
            </label>
            <Controller
              control={control}
              name="numberOfPlayers"
              render={({ field }) => {
                return (
                  <select
                    className="appearance-none w-full py-1 px-2 bg-white"
                    id="frm-whatever"
                    {...field}
                  >
                    {[5, 6, 7, 8, 9, 10].map((number) => {
                      return (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      );
                    })}
                  </select>
                );
              }}
            />

            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </fieldset>
        {
          <div>
            {[...Array(Number(watch("numberOfPlayers"))).keys()].map(
              (index) => {
                return (
                  <input
                    {...register(
                      `players.${index - 1}` as keyof ChoosePlayersFormType
                    )}
                    placeholder="playerName"
                    key={index}
                    id={`player${index + 1}-name`}
                  />
                );
              }
            )}
          </div>
        }
        <button type="submit">submit</button>
      </form>
      <div className="flex flex-nowrap overflow-auto gap-2">
        {AVALON_ROLES.slice(0, numberOfPlayers).map((role) => (
          <CharacterCard key={role.id} {...role} />
        ))}
      </div>
    </div>
  );
};

export default SelectPlayers;
