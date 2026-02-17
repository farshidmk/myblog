"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import Link from "next/link";
import { AlbumIcon, ArrowLeft, Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import AddNewCategory from "./_components/AddNewCategory";
import { WordCategory } from "./wordCategory.types";
import ShowError from "@/components/error/ShowError";

type ApiErrorPayload = {
  message?: string;
  errors?: string[];
};

type UpdateCategoryBody = {
  name: string;
};

export default function WordCategoryPage() {
  const [editState, setEditState] = useState<{
    id: number | string;
    name: string;
  } | null>(null);

  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery<WordCategory[]>({
    queryKey: ["word-categories"],
  });

  const updateMutation = useMutation<
    WordCategory,
    Error,
    AxiosRequestConfig<UpdateCategoryBody>
  >({});

  const deleteMutation = useMutation<WordCategory, Error, AxiosRequestConfig>(
    {},
  );

  const isBusy = updateMutation.isPending || deleteMutation.isPending;

  const sortedCategories = useMemo(() => {
    return [...(categories || [])].sort((a, b) =>
      a.name.localeCompare(b.name, "fa", { sensitivity: "base" }),
    );
  }, [categories]);

  const handleSaveEdit = () => {
    if (!editState) return;
    const trimmedName = editState.name.trim();
    if (!trimmedName) return;

    updateMutation.mutate(
      {
        url: `word-categories/${editState.id}`,
        method: "patch",
        data: { name: trimmedName },
      },
      {
        onSuccess: async () => {
          setEditState(null);
          await refetch();
        },
      },
    );
  };

  const handleDelete = (id: number | string) => {
    deleteMutation.mutate(
      {
        url: `word-categories/${id}`,
        method: "delete",
      },
      {
        onSuccess: async () => {
          if (editState?.id === id) setEditState(null);
          await refetch();
        },
      },
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-xl">
        <h1 className="text-3xl font-black">مدیریت دسته‌بندی واژه‌ها</h1>
        <p className="mt-2 text-sm text-slate-100/90">
          ایجاد، ویرایش و حذف دسته‌بندی‌ها. نمایش واژه‌ها در هر دسته .
        </p>
      </div>

      <AddNewCategory />

      <ShowError
        error={deleteMutation.error?.message || updateMutation.error?.message}
      />

      <section className="mt-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner className="h-8 w-8" />
          </div>
        ) : sortedCategories.length === 0 ? (
          <Card className="border-dashed border-slate-300">
            <CardContent className="py-8 text-center text-slate-600">
              هنوز دسته‌بندی‌ای ثبت نشده است.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedCategories.map((category) => {
              const isEditing = editState?.id === category.id;
              return (
                <Card key={category.id} className="border-slate-200">
                  <CardContent className="space-y-4 p-4">
                    {isEditing ? (
                      <Input
                        value={editState.name}
                        onChange={(event) =>
                          setEditState({
                            ...editState,
                            name: event.target.value,
                          })
                        }
                        className="h-10"
                      />
                    ) : (
                      <div className="flex gap-2 items-center">
                        <p className="text-base font-bold text-slate-900">
                          {category.name}
                        </p>
                        <div>
                          <p className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-200 px-3 py-1 text-xs font-semibold">
                            <AlbumIcon className="h-3.5 w-3.5" />
                            {category._count?.words ?? 0} کلمه
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isBusy || !editState.name.trim()}
                        >
                          <Save className="h-4 w-4" />
                          ذخیره
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setEditState({
                              id: category.id,
                              name: category.name,
                            })
                          }
                        >
                          <Pencil className="h-4 w-4" />
                          ویرایش
                        </Button>
                      )}

                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
                        disabled={isBusy}
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف
                      </Button>

                      <Link href={`/settings/words/category/${category.id}`}>
                        <Button type="button" size="sm" variant="secondary">
                          نمایش کلمات
                          <ArrowLeft className="mr-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join("، ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "خطا در انجام عملیات. لطفاً دوباره تلاش کنید.";
}
