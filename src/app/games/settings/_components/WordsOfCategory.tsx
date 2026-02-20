"use client";

import { getWordsByCategory, saveGameWord } from "@/lib/nestApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Difficulty, GameWord, GameWordCategory } from "@/types/game";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { wordValidation } from "../gameSettingValidations";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { CirclePlus } from "lucide-react";
import { z } from "zod";
import { toast } from "react-toastify";
import WordCard from "./WordCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

type Props = {
  categoryId: GameWordCategory["id"];
};

type EditWordForm = z.infer<typeof wordValidation>;

const WordsOfCategory = ({ categoryId }: Props) => {
  const [allWords, setAllWords] = useState<GameWord[]>([]);
  const [status, setstatus] = useState<ActionResponseStatus>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditWordForm>({
    resolver: zodResolver(wordValidation),
    defaultValues: {
      word: "",
      difficulty: Difficulty.easy,
      categoryId,
    },
  });

  async function onSubmit(value: EditWordForm) {
    const response = await saveGameWord(value);
    if (!response.success) {
      toast.error(response.errors?.join(" , ") || "??? ?? ????? ??????");
    } else {
      toast.success(`???? ${value.word} ????? ??`);
    }
  }

  useEffect(() => {
    async function getAllWordsByCategory() {
      setstatus("pending");
      const res = await getWordsByCategory(categoryId);
      if (res.success) {
        setAllWords(res.data!);
        setstatus("success");
      }
    }
    getAllWordsByCategory();
  }, [categoryId]);

  if (status === "pending") {
    return <Spinner className="h-8 w-8" />;
  }

  return (
    <div>
      <div className="flex gap-1 p-2">
        {allWords?.map((w) => (
          <WordCard word={w} key={w.id} />
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-3 flex flex-row items-center justify-between w-full gap-2">
            <UserInputWrapper label="????" error={errors?.word?.message}>
              <Input
                id="name"
                type="text"
                {...register("word")}
                placeholder=" ???? ?? ???? ????..."
                className="h-9"
              />
            </UserInputWrapper>

            <UserInputWrapper
              label="???? ????"
              error={errors?.difficulty?.message}
            >
              <select
                id="difficulty"
                {...register("difficulty")}
                className="h-9 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option
                  value={Difficulty.easy}
                  className="font-semibold text-base text-green-400"
                >
                  ????
                </option>
                <option
                  value={Difficulty.medium}
                  className="font-semibold text-base text-amber-400"
                >
                  ?????
                </option>
                <option
                  value={Difficulty.hard}
                  className="font-semibold text-base text-red-400"
                >
                  ???
                </option>
              </select>
            </UserInputWrapper>

            <Button
              size="sm"
              variant="ghost"
              className="h-10 w-20"
              disabled={isSubmitting}
            >
              <CirclePlus className="h-5 w-5 text-primary" />
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default WordsOfCategory;
