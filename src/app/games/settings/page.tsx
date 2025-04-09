"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { GameSettingWordCategoryForm } from "./gameSetting-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordCategoryValidation } from "./gameSettingValidations";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { createGameWordCategory } from "@/app/_actions/gameWord";

const GameSettingPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameSettingWordCategoryForm>({
    resolver: zodResolver(wordCategoryValidation),
  });

  async function onSubmit({ name }: GameSettingWordCategoryForm) {
    createGameWordCategory(name);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md m-auto border rounded-md border-blue-400 p-2 mt-2"
      >
        <div className=" flex flex-col gap-2 mb-2 items-center justify-center min-h-28">
          <UserInputWrapper label="نام دسته بندی" error={errors?.name?.message}>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="نام دسته بندی را وارد کنید..."
              className="input input-sm border border-gray-300"
            />
          </UserInputWrapper>

          <button
            className="btn btn-soft btn-success"
            type="submit"
            disabled={isSubmitting}
          >
            ذخیره
            {/* {isSubmitting ? <Circul} */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameSettingPage;
