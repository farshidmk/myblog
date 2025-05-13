"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Difficulty, GameWordCategory } from "@prisma/client";
import ErrorHandler from "@/components/error/ErrorHandler";
import { useFormContext } from "react-hook-form";
import { DowrChoosePlayer } from "../../dowrGame-types";

const ChooseWords = () => {
  const { watch, setValue } = useFormContext<DowrChoosePlayer>();
  const selectedCategories = watch("categories") || [];
  const selectedDifficulties = watch("difficulty") || [];
  const { data, status, refetch } = useQuery<
    ActionResponse<GameWordCategory[]>,
    Error,
    GameWordCategory[]
  >({
    queryKey: ["/api/games/category"],
    select: (res) => res.data || [],
  });

  //   const difficultyOptions = {
  //     easy: Difficulty.easy,
  //     medium: Difficulty.medium,
  //     hard: Difficulty.hard,
  //   }

  const difficultyOptions = Object.values(Difficulty); // ["easy", "medium", "hard"]

  return (
    <div className="mt-20">
      {status === "error" ? (
        <ErrorHandler onRefetch={refetch} />
      ) : status === "pending" ? (
        <span className="loading loading-bars loading-xl"></span>
      ) : status === "success" && data ? (
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex flex-wrap gap-3">
            {data?.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => {
                    const updated = isSelected
                      ? selectedCategories.filter((n) => n !== category.id)
                      : [...selectedCategories, category.id];
                    setValue("categories", updated);
                  }}
                  className={`px-4 py-2 rounded-full border text-sm transition-all
              ${
                isSelected
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white hover:border-primary"
              }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="card shadow-xl p-4 mt-4 bg-amber-100 shadow-amber-300">
        <p className="font-semibold">سطح سختی مورد نظر را انتخاب کنید:</p>
        <div className="flex gap-3 flex-wrap">
          {difficultyOptions.map((level) => {
            const isSelected = selectedDifficulties.includes(level);
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  const updated = isSelected
                    ? selectedDifficulties.filter((v: string) => v !== level)
                    : [...selectedDifficulties, level];
                  if (updated.length === 0) {
                    updated.push("easy");
                  }

                  setValue("difficulty", updated);
                }}
                className={`px-4 py-2 rounded-full border transition-all text-sm capitalize ${
                  isSelected
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 border-gray-300 hover:bg-primary hover:text-white"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChooseWords;
