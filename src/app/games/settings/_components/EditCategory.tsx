"use client";

import {
  EditGameWordCategory,
  getAllGameWordByCategory,
  getAllGameWordCategory,
} from "@/app/_actions/gameWord";
import React, { useEffect, useState } from "react";
import { GameSettingCategoryWithWordsCount } from "../gameSetting-type";
import { GameWord, GameWordCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { wordCategoryValidation } from "../gameSettingValidations";

type Props = {
  category: GameWordCategory;
};

type EditCategoryForm = Omit<GameWordCategory, "id">;

const EditCategory = ({ category }: Props) => {
  const [allWords, setAllWords] = useState<GameWord[]>([]);
  const [status, setstatus] = useState<ActionResponseStatus>("idle");

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCategoryForm>({
    resolver: zodResolver(wordCategoryValidation),
    defaultValues: {
      name: category.name,
    },
  });

  async function onSubmit({ name }: EditCategoryForm) {
    const response = await EditGameWordCategory(name, category.id);
    if (!response.success) {
    }
  }

  useEffect(() => {
    async function getAllWordsByCategory() {
      setstatus("pending");
      const res = await getAllGameWordByCategory(category.id);
      if (res.success) {
        setAllWords(res.data!);
        setstatus("success");
      }
    }
    getAllWordsByCategory();
  }, [category?.id]);

  if (status === "pending") {
    return <div className="skeleton h-32 w-full"></div>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border w-full"
      >
        {isSubmitting ? (
          <div className="skeleton h-full w-full"></div>
        ) : (
          <div className="card-body flex flex-row items-center justify-between w-full">
            <div className="flex-1">
              <UserInputWrapper
                label=" دسته بندی"
                error={errors?.name?.message}
              >
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder=" دسته بندی را وارد کنید..."
                  className="input input-sm border border-gray-300 flex-1"
                />
              </UserInputWrapper>
            </div>

            <button
              className="btn btn-sm btn-ghost h-10 w-20"
              disabled={isSubmitting || !Boolean(watch("name"))}
            >
              <CircleCheck className="h-10 w-10 text-primary hover:text-primary-focus disabled:text-gray-300 transition-all" />
            </button>
          </div>
        )}
      </form>
      {allWords?.map((w) => (
        <div key={w.id}>{w.word}</div>
      ))}
    </div>
  );
};

export default EditCategory;
