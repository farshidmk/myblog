"use client";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { GameSettingWordCategoryForm } from "../gameSetting-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordCategoryValidation } from "../gameSettingValidations";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { createGameWordCategory } from "@/app/_actions/gameWord";

const AddNewCategory = () => {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GameSettingWordCategoryForm>({
    resolver: zodResolver(wordCategoryValidation),
  });

  async function onSubmit({ name }: GameSettingWordCategoryForm) {
    const response = await createGameWordCategory(name);
    if (response.success) {
      reset();
    }
  }
  return (
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
              label="نام دسته بندی"
              error={errors?.name?.message}
            >
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="نام دسته بندی را وارد کنید..."
                className="input input-sm border border-gray-300 flex-1"
              />
            </UserInputWrapper>
          </div>

          <button
            className="btn btn-sm btn-ghost h-10 w-20"
            disabled={isSubmitting || !Boolean(watch("name"))}
          >
            <CirclePlus className="h-10 w-10 text-primary hover:text-primary-focus disabled:text-gray-300 transition-all" />
          </button>
        </div>
      )}
    </form>
  );
};

export default AddNewCategory;
