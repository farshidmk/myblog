"use client";

import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { DowrChoosePlayer } from "../../dowrGame-types";

const CircleUsers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { control } = useFormContext<DowrChoosePlayer>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fields } = useFieldArray({
    control,
    name: "players",
  });

  const radius = 200; // شعاع دایره
  const center = 200; // مرکز دایره (برای x و y)
  const angleStep = 360 / fields.length;

  // نقشه‌ای برای اختصاص رنگ به هر ایندکس
  const indexToColor: Record<number, string> = {};

  for (let i = 0; i < fields.length / 2; i++) {
    const color = colors[i % colors.length];
    indexToColor[i] = color;
    indexToColor[i + fields.length / 2] = color;
  }

  return (
    <div className="relative w-96 h-96 border border-dashed border-blue-400 m-auto rounded-full mt-8">
      {fields.map((_, index) => {
        const angleInRadians = (angleStep * index * Math.PI) / 180;
        const x = center + radius * Math.cos(angleInRadians);
        const y = center + radius * Math.sin(angleInRadians);

        return (
          <div
            key={index}
            className={`absolute -translate-y-1/2 -translate-x-1/2 p-1 rounded-lg`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              backgroundColor: indexToColor[index],
            }}
          >
            <Controller
              name={`players.${index}.name`}
              control={control}
              rules={{ required: "نام را وارد کنید" }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    className="w-28 p-2 rounded-md bg-none border-none focus:outline-none text-black bg-transparent text-center"
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
        );
      })}
    </div>
  );
};

export default CircleUsers;

const colors = [
  "#FFB6C1",
  "#ADD8E6",
  "#90EE90",
  "#FFD700",
  "#FFA07A",
  "#9370DB",
];
