"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Difficulty, GameWordCategory } from "@/types/game";
import ErrorHandler from "@/components/error/ErrorHandler";
import { useFormContext } from "react-hook-form";
import { DowrChoosePlayer } from "../../dowrGame-types";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

const ChooseWords = () => {
  const { watch, setValue } = useFormContext<DowrChoosePlayer>();
  const selectedCategories = watch("categories") || [];
  const selectedDifficulties = watch("difficulty") || [];
  const { data, status, refetch } = useQuery<
    ActionResponse<GameWordCategory[]>,
    Error,
    GameWordCategory[]
  >({
    queryKey: ["/games/category"],
    select: (res) => res.data || [],
  });

  const difficultyOptions = Object.values(Difficulty);

  return (
    <div className="mt-20">
      {status === "error" ? (
        <ErrorHandler onRefetch={refetch} />
      ) : status === "pending" ? (
        <Spinner className="h-8 w-8" />
      ) : status === "success" && data ? (
        <Card>
          <CardContent className="p-4">
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
          </CardContent>
        </Card>
      ) : null}

      <Card className="mt-4 bg-amber-100 border-amber-300 shadow-amber-200">
        <CardContent className="p-4">
          <p className="font-semibold">??? ???? ???? ??? ?? ?????? ????:</p>
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
                      updated.push(Difficulty.easy);
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseWords;
