"use client";

import { EditGameWordCategory } from "@/app/games/settings/_actions/gameWord";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameWordCategory } from "@prisma/client";
import { CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { wordCategoryValidation } from "../gameSettingValidations";
import WordsOfCategory from "./WordsOfCategory";
import { useEffect } from "react";

type Props = {
  category: GameWordCategory;
};

type EditCategoryForm = Omit<GameWordCategory, "id">;

const EditCategory = ({ category }: Props) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCategoryForm>({
    resolver: zodResolver(wordCategoryValidation),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    setValue("name", category.name);
  }, [category, setValue]);

  async function onSubmit({ name }: EditCategoryForm) {
    const response = await EditGameWordCategory(name, category.id);
    if (!response.success) {
    }
  }

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        {isSubmitting ? (
          <div className="skeleton h-full w-full"></div>
        ) : (
          <div className="card-body flex flex-row items-center justify-between w-72">
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
      <WordsOfCategory key={category.id} categoryId={category.id} />
    </div>
  );
};

export default EditCategory;
