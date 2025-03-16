"use client";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AvalonGetPlayersNameForm, AvalonPlayer } from "../avalon-types";
import {
  AVAILABLE_ROLES_BY_PLAYERS_COUNT,
  AVALON_ROLES,
} from "../avalon-shared";
import { useAvalonGame } from "../AvalonProvider";
import CharacterCard from "./CharacterCard";

const ChoosePlayers = () => {
  const { setPlayers, setGameStep } = useAvalonGame();
  const [numberOfPlayers, setNumberOfPlayers] = useState(5);
  const { watch, control, handleSubmit } = useForm<AvalonGetPlayersNameForm>({
    defaultValues: {
      players: Array(5).fill({ name: "" }),
    },
  });
  const players = watch("players");
  const { append, remove, fields } = useFieldArray({
    control,
    name: "players",
  });

  // Get available roles based on number of players
  const getAvailableRoles = (playerCount: number) => {
    const availableRoles = AVAILABLE_ROLES_BY_PLAYERS_COUNT[playerCount];
    const roles = [...AVALON_ROLES];
    return availableRoles.map((role) => roles.find((r) => r.name === role)!);
  };

  const onSubmit = (data: AvalonGetPlayersNameForm) => {
    // Validate that all names are unique
    const names = data.players.map((p) => p.name);
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
      alert("All player names must be unique!");
      return;
    }

    // Get available roles for current player count
    const availableRoles = getAvailableRoles(numberOfPlayers);

    // Shuffle roles
    const shuffledRoles = [...availableRoles].sort(() => Math.random() - 0.5);

    // Create players with assigned roles
    const gamePlayers: AvalonPlayer[] = data.players.map((player, index) => ({
      playerName: player.name,
      roleName: shuffledRoles[index].name,
      isEvil: shuffledRoles[index].isEvil,
      imgUrl: shuffledRoles[index].imgUrl,
    }));

    setPlayers(gamePlayers);
    setGameStep("show-roles");
  };

  // Handle number of players change
  const handleNumPlayersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newNumPlayers = parseInt(event.target.value);
    setNumberOfPlayers(newNumPlayers);

    // If the number of players is increased, append new empty fields
    if (newNumPlayers > players.length) {
      for (let i = players.length; i < newNumPlayers; i++) {
        append({ name: "" });
      }
    }

    // If the number of players is decreased, remove fields
    if (newNumPlayers < players.length) {
      for (let i = players.length; i > newNumPlayers; i--) {
        remove(i - 1);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Avalon</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <fieldset className="border rounded-lg p-4">
            <legend className="text-lg font-semibold px-2">
              Number of Players
            </legend>
            <select
              value={numberOfPlayers}
              className="w-full p-2 border rounded-md"
              onChange={handleNumPlayersChange}
            >
              {NUMBER_OF_PLAYERS.map((num) => (
                <option key={num} value={num}>
                  {num} Players
                </option>
              ))}
            </select>
          </fieldset>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-1">
                  <label
                    htmlFor={`players[${index}].name`}
                    className="block font-medium"
                  >
                    Player {index + 1}
                  </label>
                  <Controller
                    name={`players.${index}.name`}
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          placeholder="Enter player name..."
                          className="w-full p-2 border rounded-md"
                        />
                        {fieldState.error && (
                          <span className="text-red-500 text-sm">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Game
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Roles</h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            key={numberOfPlayers}
          >
            {getAvailableRoles(numberOfPlayers).map((role) => (
              <CharacterCard key={role.id} {...role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlayers;

const NUMBER_OF_PLAYERS = Array.from({ length: 6 }, (_, i) => i + 5);
