"use client";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AvalonGetPlayersNameForm } from "../avalon-types";

const ChoosePlayers = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(5);
  const { watch, control, handleSubmit } = useForm<AvalonGetPlayersNameForm>(
    {}
  );
  const players = watch("players");
  const { append, remove, fields } = useFieldArray({
    control,
    name: "players",
  });

  const onSubmit = async (data: AvalonGetPlayersNameForm) => {
    console.log({ data });
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
        append({ name: `بازیکن-${i + 1}` });
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
    <div>
      <h1 className="mb-2">Avalon</h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">تعداد بازیکنان</legend>
        <select
          value={numberOfPlayers}
          className="select select-primary select-sm"
          onChange={handleNumPlayersChange}
        >
          {NUMBER_OF_PLAYERS.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </fieldset>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label
              htmlFor={`players[${index}].name`}
              className="font-semibold text-sm"
            >
              بازیکن
            </label>
            <Controller
              name={`players.${index}.name`}
              control={control}
              defaultValue={field.name}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder={`نام بازیکن...`}
                  className="input input-primary input-md"
                />
              )}
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">
          شروع
        </button>
      </form>
    </div>
  );
};

export default ChoosePlayers;

const NUMBER_OF_PLAYERS = Array.from({ length: 6 }, (_, i) => i + 5);
