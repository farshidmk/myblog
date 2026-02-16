import React from "react";
import { GameSettingCategoryWithWordsCount } from "../gameSetting-type";
import { Pencil } from "lucide-react";
import { GameWordCategory } from "@/types/game";

const CategoryCard = ({
  handleOnEdit,
  category: { id, name, wordsCount },
}: {
  handleOnEdit: (category: GameWordCategory) => void;
  category: GameSettingCategoryWithWordsCount;
}) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border h-full w-52">
      <div className="card-body flex flex-row items-center justify-between">
        <div>
          <h2 className="card-title text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">تعداد کلمات: {wordsCount}</p>
        </div>

        <button
          className="btn btn-sm btn-ghost"
          onClick={() => handleOnEdit({ id, name })}
        >
          <Pencil className="h-5 w-5 text-primary hover:text-primary-focus" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
