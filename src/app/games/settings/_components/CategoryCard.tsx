import React from "react";
import { GameSettingCategoryWithWordsCount } from "../gameSetting-type";
import { Pencil } from "lucide-react";
import { GameWordCategory } from "@/types/game";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CategoryCard = ({
  handleOnEdit,
  category: { id, name, wordsCount },
}: {
  handleOnEdit: (category: GameWordCategory) => void;
  category: GameSettingCategoryWithWordsCount;
}) => {
  return (
    <Card className="h-full w-52 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            ????? ?????: {wordsCount}
          </CardDescription>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleOnEdit({ id, name })}
        >
          <Pencil className="h-5 w-5 text-primary" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
