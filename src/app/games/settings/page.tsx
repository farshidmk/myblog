"use client";
import { useEffect, useState } from "react";
import AddNewCategory from "./_components/AddNewCategory";
import CategoryCard from "./_components/CategoryCard";
import { GameSettingCategoryWithWordsCount } from "./gameSetting-type";
import EditCategory from "./_components/EditCategory";
import { GameWordCategory } from "@prisma/client";

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
      const response = await fetch("/api/games/settings/games-word/category");
      const result =
        (await response.json()) as GameSettingCategoryWithWordsCount[];
      setStatus("success");
      setAllCategories(result);
    }
    getAllGameWordCategory();
  }, []);

  if (status === "pending") {
    return <div className="skeleton h-32 w-full"></div>;
  }
  return (
    <div className="w-full">
      {Array.isArray(allCategories) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 gap-6 p-2">
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
