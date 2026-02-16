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
      toast.error(response.errors?.join(" , ") || "خطا در انجام عملیات");
    } else {
      toast.success(`کلمه ${value.word} اضافه شد`);
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
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div>
      <div className="flex gap-1 p-2">
        {allWords?.map((w) => (
          <WordCard word={w} key={w.id} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border w-full max-w-md"
      >
        {isSubmitting ? (
          <div className="skeleton h-full w-full"></div>
        ) : (
          <div className="card-body flex flex-row items-center justify-between w-full gap-2">
            <UserInputWrapper label="کلمه" error={errors?.word?.message}>
              <input
                id="name"
                type="text"
                {...register("word")}
                placeholder=" کلمه را وارد کنید..."
                className="input input-sm border border-gray-300"
              />
            </UserInputWrapper>

            <UserInputWrapper
              label="درجه سختی"
              error={errors?.difficulty?.message}
            >
              <select
                id="difficulty"
                {...register("difficulty")}
                className="input input-sm border border-gray-300"
              >
                <option
                  value={Difficulty.easy}
                  className="font-semibold text-base text-green-400"
                >
                  آسان
                </option>
                <option
                  value={Difficulty.medium}
                  className="font-semibold text-base text-amber-400"
                >
                  متوسط
                </option>
                <option
                  value={Difficulty.hard}
                  className="font-semibold text-base text-red-400"
                >
                  سخت
                </option>
              </select>
            </UserInputWrapper>

            <button
              className="btn btn-sm btn-ghost h-10 w-20"
              disabled={isSubmitting}
            >
              <CirclePlus className="h-10 w-10 text-primary hover:text-primary-focus disabled:text-gray-300 transition-all" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default WordsOfCategory;
