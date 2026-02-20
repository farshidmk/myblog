"use client";

import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameWordCategory } from "@/types/game";
import { CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { wordCategoryValidation } from "../gameSettingValidations";
import WordsOfCategory from "./WordsOfCategory";
import { useEffect } from "react";
import { editGameWordCategory } from "@/lib/nestApi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

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
    await editGameWordCategory(category.id, name);
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {isSubmitting ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <CardContent className="p-2 flex flex-row items-center justify-between w-72">
            <div className="flex-1">
              <UserInputWrapper
                label=" ???? ????"
                error={errors?.name?.message}
              >
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder=" ???? ???? ?? ???? ????..."
                  className="h-9"
                />
              </UserInputWrapper>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="h-10 w-20"
              disabled={isSubmitting || !Boolean(watch("name"))}
            >
              <CircleCheck className="h-5 w-5 text-primary" />
            </Button>
          </CardContent>
        )}
      </form>
      <WordsOfCategory key={category.id} categoryId={category.id} />
    </Card>
  );
};

export default EditCategory;
