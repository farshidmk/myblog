"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Eye, Pencil, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Alert from "@/components/ui/alert/Alert";
import { Difficulty } from "@/types/game";
import { ApiErrorPayload, WordResponse } from "../words.type";

type Props = {
  word: WordResponse;
  queryKey: (string | number)[];
};

export default function WordCard({ word, queryKey }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    word: word.word,
    difficulty: word.difficulty,
  });
  const [serverError, setServerError] = useState("");

  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    unknown,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig
  >({});

  const deleteMutation = useMutation<
    unknown,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig
  >({});

  const isBusy = updateMutation.isPending || deleteMutation.isPending;

  const handleSave = () => {
    const trimmedWord = form.word.trim();
    if (!trimmedWord) return;

    setServerError("");
    updateMutation.mutate(
      {
        url: `words/${word.id}`,
        method: "patch",
        data: {
          word: trimmedWord,
          difficulty: form.difficulty,
          wordCategoryId: word.wordCategoryId,
        },
      },
      {
        onSuccess: async () => {
          setIsEditing(false);
          await queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
          setServerError(extractErrorMessage(error));
        },
      },
    );
  };

  const handleDelete = () => {
    setServerError("");
    deleteMutation.mutate(
      {
        url: `words/${word.id}`,
        method: "delete",
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
          setServerError(extractErrorMessage(error));
        },
      },
    );
  };

  const difficultyStyle = getDifficultyStyle(form.difficulty);

  return (
    <Card className="border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <Input
                value={form.word}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, word: event.target.value }))
                }
                className="h-9"
              />
            ) : (
              <p className="truncate text-base font-bold text-slate-900">
                {word.word}
              </p>
            )}

            <div className="mt-2 flex items-center gap-2">
              {isEditing ? (
                <select
                  value={form.difficulty}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      difficulty: event.target.value as Difficulty,
                    }))
                  }
                  className="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs"
                >
                  <option value={Difficulty.easy}>آسان</option>
                  <option value={Difficulty.medium}>متوسط</option>
                  <option value={Difficulty.hard}>سخت</option>
                </select>
              ) : (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyle.badge}`}
                >
                  {difficultyStyle.label}
                </span>
              )}

              <span className="text-xs text-slate-500">
                {word.wordCategoryName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSave}
                  disabled={isBusy || !form.word.trim()}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ word: word.word, difficulty: word.difficulty });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}

            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={handleDelete}
              disabled={isBusy}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {Boolean(serverError) && (
          <Alert text={serverError} severity="error" variant="soft" />
        )}
      </CardContent>
    </Card>
  );
}

function getDifficultyStyle(difficulty: Difficulty) {
  switch (difficulty) {
    case Difficulty.easy:
      return {
        label: "آسان",
        badge: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      };
    case Difficulty.medium:
      return {
        label: "متوسط",
        badge: "bg-amber-100 text-amber-800 border border-amber-200",
      };
    case Difficulty.hard:
      return {
        label: "سخت",
        badge: "bg-rose-100 text-rose-800 border border-rose-200",
      };
    default:
      return {
        label: "نامشخص",
        badge: "bg-slate-100 text-slate-700 border border-slate-200",
      };
  }
}

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join("، ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "خطا در انجام عملیات روی واژه";
}
