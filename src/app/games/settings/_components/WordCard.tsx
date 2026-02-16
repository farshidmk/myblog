import { zodResolver } from "@hookform/resolvers/zod";
import { Difficulty, GameWord } from "@/types/game";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { wordValidation } from "../gameSettingValidations";
import { z } from "zod";
import { CheckCircle, CircleX, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { editGameWord } from "@/lib/nestApi";

type Props = {
  word: GameWord;
};

type WordForm = z.infer<typeof wordValidation>;

const WordCard = ({ word }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
    watch,
  } = useForm<WordForm>({
    resolver: zodResolver(wordValidation),
    defaultValues: word,
  });
  const difficulty = watch("difficulty");

  const onSubmit = async (data: WordForm) => {
    const result = await editGameWord({ ...data, id: word.id });
    if (!result.success) {
      toast.error(result.errors);
      return 0;
    }
    setValue("word", result.data!.word!);
    setValue("difficulty", result.data!.difficulty!);
    toast.success(`کلمه با موفقیت به روزرسانی شد`);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-1 border border-gray-200 w-full max-w-60 flex flex-col justify-between transition-transform duration-300 hover:shadow-xl">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 h-full"
        >
          {isSubmitting ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <>
              <div>
                <input
                  {...register("word")}
                  className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="کلمه"
                />
                <select
                  {...register("difficulty")}
                  className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={Difficulty.easy}>آسان</option>
                  <option value={Difficulty.medium}>متوسط</option>
                  <option value={Difficulty.hard}>سخت</option>
                </select>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  type="submit"
                  className=" text-green-600  rounded-md hover:text-green-700 transition"
                >
                  <CheckCircle />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset(word);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CircleX />
                </button>
              </div>
            </>
          )}
        </form>
      ) : (
        <div className="flex items-center gap-2 h-full">
          <div className="flex flex-col gap-1 w-3/4">
            <h3 className="text-lg font-bold text-gray-800">{watch("word")}</h3>
            <div
              className={`inline-block mt-1 text-xs text-center font-medium px-3 py-1 rounded-full w-full ${
                difficulty === Difficulty.easy
                  ? "bg-green-100 text-green-800"
                  : difficulty === Difficulty.medium
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {difficultyEnumToText(difficulty)}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="self-start text-blue-600 hover:underline text-lg flex items-center h-full w-1/4 justify-center"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WordCard;

function difficultyEnumToText(difficulty: Difficulty) {
  switch (difficulty) {
    case Difficulty.easy:
      return "آسان";
    case Difficulty.medium:
      return "متوسط";
    case Difficulty.hard:
      return "سخت";

    default:
      break;
  }
}
