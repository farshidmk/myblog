"use client";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { GameSettingWordCategoryForm } from "../gameSetting-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordCategoryValidation } from "../gameSettingValidations";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { createGameWordCategory } from "@/lib/nestApi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-60">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="px-2 py-3 flex flex-row items-center justify-between w-full">
          <div className="w-2/3">
            <UserInputWrapper
              label="??? ???? ????"
              error={errors?.name?.message}
            >
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="???? ???? ?? ???? ????..."
                className="h-9"
              />
            </UserInputWrapper>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-1/3"
            disabled={isSubmitting || !Boolean(watch("name"))}
          >
            <CirclePlus className="h-5 w-5 text-primary" />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddNewCategory;
