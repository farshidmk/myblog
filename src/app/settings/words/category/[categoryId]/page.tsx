"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import Alert from "@/components/ui/alert/Alert";
import { Difficulty } from "@/types/game";
import ListOfWords from "../../_components/ListOfWords";
import { ApiErrorPayload } from "../../words.type";
import { WordCategory } from "@/app/settings/wordCategory/wordCategory.types";

const createWordSchema = z.object({
  word: z.string().trim().min(2, "Word must be at least 2 characters."),
  difficulty: z.nativeEnum(Difficulty),
});

type CreateWordForm = z.infer<typeof createWordSchema>;

type CreateWordBody = {
  word: string;
  difficulty: Difficulty;
  wordCategoryId: number;
};

export default function CategoryWordsPage() {
  const params = useParams<{ categoryId: string }>();
  const queryClient = useQueryClient();
  const categoryId = params.categoryId;
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWordForm>({
    resolver: zodResolver(createWordSchema),
    defaultValues: {
      word: "",
      difficulty: Difficulty.easy,
    },
  });

  const { data: categories, status: categoriesStatus } = useQuery<
    WordCategory[]
  >({
    queryKey: ["word-categories"],
  });

  const category = useMemo(() => {
    return categories?.find((item) => String(item.id) === String(categoryId));
  }, [categories, categoryId]);

  const { mutate, isPending } = useMutation<
    unknown,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig<CreateWordBody>
  >({});

  const handleCreateWord = (data: CreateWordForm) => {
    setServerError("");
    mutate(
      {
        url: "words",
        method: "post",
        data: {
          word: data.word.trim(),
          difficulty: data.difficulty,
          wordCategoryId: Number(categoryId),
        },
      },
      {
        onSuccess: async () => {
          reset();
          await queryClient.invalidateQueries({
            queryKey: ["words", categoryId],
          });
        },
        onError: (error) => {
          setServerError(extractErrorMessage(error));
        },
      },
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 md:py-12">
      <Card className="border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">{category?.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Link href="/settings/words">
            <Button
              type="button"
              variant="secondary"
              className="border-0 bg-white text-slate-900 hover:bg-slate-100"
            >
              Back to words
              <ArrowLeft className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Add new word</CardTitle>
        </CardHeader>
        <CardContent>
          {categoriesStatus === "pending" ? (
            <div className="flex justify-center py-6">
              <Spinner className="h-6 w-6" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleCreateWord)}
              className="grid gap-3 md:grid-cols-[1fr_180px_auto]"
            >
              <div>
                <Input
                  {...register("word")}
                  className="h-10"
                  placeholder="Example: programming"
                />
                {errors.word && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.word.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("difficulty")}
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
                >
                  <option value={Difficulty.easy}>Easy</option>
                  <option value={Difficulty.medium}>Medium</option>
                  <option value={Difficulty.hard}>Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="h-10 bg-teal-700 text-white hover:bg-teal-800"
              >
                <Plus className="h-4 w-4" />
                {isPending ? "Saving..." : "Add word"}
              </Button>
            </form>
          )}

          {Boolean(serverError) && (
            <div className="mt-3">
              <Alert text={serverError} severity="error" variant="soft" />
            </div>
          )}
        </CardContent>
      </Card>

      <ListOfWords categoryId={categoryId} />
    </main>
  );
}

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join(", ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "Failed to add word. Please try again.";
}
