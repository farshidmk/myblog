"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { DEFAULT_PAGINATION } from "@/shared/const";
import { apiClient } from "@/lib/reactQueryFunctions";
import WordCard from "./WordCard";
import { WordsListResponse } from "../words.type";

type Props = {
  categoryId?: string | null;
};

const ListOfWords = ({ categoryId: categoryIdProp }: Props) => {
  const searchParams = useSearchParams();
  const categoryId = categoryIdProp ?? searchParams.get("categoryId");
  const [pagination, setPagination] =
    useState<ApiPagination>(DEFAULT_PAGINATION);
  const wordsQueryPrefix = useMemo(
    () => ["words", categoryId ?? "all"],
    [categoryId],
  );

  const queryKey = useMemo(
    () => [...wordsQueryPrefix, pagination.skip, pagination.take],
    [wordsQueryPrefix, pagination.skip, pagination.take],
  );

  const { data, status, isFetching } = useQuery<WordsListResponse>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get("/words", {
        params: {
          skip: pagination.skip,
          take: pagination.take,
          ...(categoryId ? { wordCategoryId: categoryId } : {}),
        },
      });
      return normalizeWordsListResponse(response.data);
    },
  });

  const words = data?.data || [];
  const meta = data?.meta;
  const canGoPrev = (meta?.skip ?? pagination.skip) > 0;
  const canGoNext =
    meta !== undefined
      ? meta.skip + meta.take < meta.total
      : words.length === pagination.take;
  const currentSkip = meta?.skip ?? pagination.skip;
  const currentCount = meta?.count ?? words.length;
  const total = meta?.total ?? words.length;
  const start = total === 0 ? 0 : currentSkip + 1;
  const end = Math.min(currentSkip + currentCount, total);

  return (
    <Card className="border-slate-200 pt-2">
      <CardContent className="space-y-4">
        {status === "pending" ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-8 w-8" />
          </div>
        ) : words.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-600">
            واژه‌ای برای نمایش وجود ندارد.
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {words.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  queryKey={wordsQueryPrefix}
                />
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 sm:flex-row">
              <p className="text-xs text-slate-600">
                نمایش {start} تا {end} از {total}
                {isFetching ? " (در حال بروزرسانی...)" : ""}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      skip: Math.max(0, prev.skip - prev.take),
                    }))
                  }
                  disabled={!canGoPrev || isFetching}
                >
                  قبلی
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      skip: prev.skip + prev.take,
                    }))
                  }
                  disabled={!canGoNext || isFetching}
                >
                  بعدی
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ListOfWords;

function normalizeWordsListResponse(input: unknown): WordsListResponse {
  if (
    typeof input === "object" &&
    input !== null &&
    Array.isArray((input as WordsListResponse).data)
  ) {
    return input as WordsListResponse;
  }

  return {
    data: [],
    meta: {
      total: 0,
      skip: 0,
      take: DEFAULT_PAGINATION.take,
      count: 0,
    },
  };
}
