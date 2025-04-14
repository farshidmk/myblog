export type GameSettingWordCategoryForm = {
  name: string;
};

export type GameSettingCategoryWithWordsCount = {
  id: string;
  /**
   * name of the category
   */
  name: string;

  /**
   * number of words related to category
   */
  wordsCount: number;
};
