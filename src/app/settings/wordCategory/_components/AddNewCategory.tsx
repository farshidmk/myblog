"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Alert from "@/components/ui/alert/Alert";
import { WordCategory } from "../wordCategory.types";

export default function AddNewCategory() {
  const [serverError, setServerError] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryBody>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation<
    WordCategory,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig<CreateCategoryBody>
  >({});

  const handleCreate = (data: CreateCategoryBody) => {
    setServerError("");
    mutate(
      {
        url: "word-categories",
        method: "post",
        data: { name: data.name.trim() },
      },
      {
        onSuccess: (res) => {
          reset();
          queryClient.setQueryData<WordCategory[]>(
            ["word-categories"],
            (oldData) => {
              if (!oldData || oldData.length === 0) {
                return oldData; // No data to update
              }

              return [...oldData, { ...res, _count: { words: 0 } }];
            },
          );
        },
        onError: (error) => {
          setServerError(extractErrorMessage(error));
        },
      },
    );
  };

  return (
    <section className="mt-8">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>افزودن دسته‌بندی جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="flex-1">
              <Input
                {...register("name")}
                placeholder="مثال: حیوانات"
                className="h-10"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-teal-700 text-white hover:bg-teal-800"
            >
              <Plus className="h-4 w-4" />
              {isPending ? "در حال ثبت..." : "افزودن"}
            </Button>
          </form>

          {Boolean(serverError) && (
            <div className="mt-3">
              <Alert text={serverError} severity="error" variant="soft" />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

const createCategorySchema = z.object({
  name: z.string().trim().min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد."),
});

type CreateCategoryBody = {
  name: string;
};

type ApiErrorPayload = {
  message?: string;
  errors?: string[];
};

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join("، ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "خطا در افزودن دسته‌بندی. لطفاً دوباره تلاش کنید.";
}
