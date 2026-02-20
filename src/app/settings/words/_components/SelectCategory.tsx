"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { WordCategory } from "../../wordCategory/wordCategory.types";

const SelectCategory = () => {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: categories, status } = useQuery<WordCategory[]>({
    queryKey: ["word-categories"],
  });

  const sortedCategories = useMemo(() => {
    return [...(categories || [])].sort((a, b) =>
      a.name.localeCompare(b.name, "fa", { sensitivity: "base" }),
    );
  }, [categories]);

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">انتخاب دسته‌بندی واژه‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        {status === "pending" ? (
          <div className="flex justify-center py-4">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={selectedCategoryId}
              onChange={(event) => setSelectedCategoryId(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 sm:max-w-md"
            >
              <option value="">یک دسته‌بندی را انتخاب کنید</option>
              {sortedCategories.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>

            <Button
              type="button"
              className="bg-teal-700 text-white hover:bg-teal-800"
              onClick={() =>
                router.push(`/settings/words/category/${selectedCategoryId}`)
              }
              disabled={!selectedCategoryId}
            >
              نمایش واژه‌ها
              <ArrowLeft className="mr-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SelectCategory;
