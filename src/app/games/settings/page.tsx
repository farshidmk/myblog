"use client";
import { useEffect, useState } from "react";
import AddNewCategory from "./_components/AddNewCategory";
import CategoryCard from "./_components/CategoryCard";
import { GameSettingCategoryWithWordsCount } from "./gameSetting-type";
import EditCategory from "./_components/EditCategory";
import { GameWordCategory } from "@/types/game";
import { getGameWordCategoriesWithCount } from "@/lib/nestApi";

const GameSettingPage = () => {
  const [allCategories, setAllCategories] = useState<
    GameSettingCategoryWithWordsCount[]
  >([]);
  const [status, setStatus] = useState<ActionResponseStatus>("idle");
  const [selectedCategory, setSelectedCategory] = useState<
    GameWordCategory | undefined
  >(undefined);
  useEffect(() => {
    async function getAllGameWordCategory() {
      setStatus("pending");
      try {
        const result = await getGameWordCategoriesWithCount();
        setStatus("success");
        setAllCategories(result as GameSettingCategoryWithWordsCount[]);
      } catch {
        setStatus("error");
      }
    }
    getAllGameWordCategory();
  }, []);

  if (status === "pending") {
    return <div className="h-32 w-full animate-pulse rounded-xl bg-gray-200" />;
  }
  return (
    <div className="w-full">
      {Array.isArray(allCategories) ? (
        <div className="flex gap-2 p-2">
          {allCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              handleOnEdit={(cat) => setSelectedCategory(cat)}
            />
          ))}
          <AddNewCategory />
        </div>
      ) : (
        <h1>خطایی رخ داده است</h1>
      )}
      {selectedCategory && <EditCategory category={selectedCategory} />}
    </div>
  );
};

export default GameSettingPage;
