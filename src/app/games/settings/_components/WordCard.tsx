import { zodResolver } from "@hookform/resolvers/zod";
import { Difficulty, GameWord } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { wordValidation } from "../gameSettingValidations";
import { z } from "zod";

type Props = {
  word: GameWord;
};

type WordForm = z.infer<typeof wordValidation>;

const WordCard = ({ word }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<WordForm>({
    resolver: zodResolver(wordValidation),
    defaultValues: word,
  });
  const { difficulty } = word;

  const onSubmit = (data: WordForm) => {
    //   onSave(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border w-full max-w-40 h-28">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("word")}
            className="border px-3 py-2 w-full rounded"
            placeholder="Word"
          />
          <select
            {...register("difficulty")}
            className="border px-3 py-2 w-full rounded"
          >
            <option value={Difficulty.easy}>آسان</option>
            <option value={Difficulty.medium}>متوسط</option>
            <option value={Difficulty.hard}>سخت</option>
          </select>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ذخیره
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset(word);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              بازگشت
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{word.word}</h3>
          <div
            className={`badge ${
              difficulty === Difficulty.easy
                ? "badge-success"
                : difficulty === Difficulty.medium
                ? "badge-warning"
                : "badge-error"
            } `}
          >
            {difficultyEnumToText(difficulty)}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-blue-500 hover:underline"
          >
            ویرایش
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
