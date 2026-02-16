import { Difficulty, GameWord, GameWordCategory } from "@/types/game";
import { apiClient } from "./reactQueryFunctions";
import { GameSettingCategoryWithWordsCount } from "@/app/games/settings/gameSetting-type";

type SpyCategory = {
  id: string;
  name: string;
};

type SpyWord = {
  id: string;
  word: string;
  categoryId: string;
};

export async function getGameWordCategoriesWithCount() {
  const res = await apiClient.get<GameSettingCategoryWithWordsCount[]>(
    "/games/settings/games-word/category"
  );
  return res.data;
}

export async function createGameWordCategory(name: string) {
  const res = await apiClient.post<ActionResponse<GameWordCategory>>(
    "/games/word-categories",
    { name }
  );
  return res.data;
}

export async function editGameWordCategory(categoryId: string, name: string) {
  const res = await apiClient.patch<ActionResponse<GameWordCategory>>(
    `/games/word-categories/${categoryId}`,
    { name }
  );
  return res.data;
}

export async function getWordsByCategory(categoryId: string) {
  const res = await apiClient.get<ActionResponse<GameWord[]>>(
    `/games/words/category/${categoryId}`
  );
  return res.data;
}

export async function saveGameWord(payload: {
  word: string;
  categoryId: string;
  difficulty: Difficulty;
}) {
  const res = await apiClient.post<ActionResponse<GameWord>>(
    "/games/words",
    payload
  );
  return res.data;
}

export async function editGameWord(payload: {
  id: string;
  word: string;
  categoryId: string;
  difficulty: Difficulty;
}) {
  const { id, ...data } = payload;
  const res = await apiClient.patch<ActionResponse<GameWord>>(
    `/games/words/${id}`,
    data
  );
  return res.data;
}

export async function getSpyCategories() {
  const res = await apiClient.get<SpyCategory[]>("/spy/categories");
  return res.data;
}

export async function createSpyCategory(name: string) {
  const res = await apiClient.post<SpyCategory>("/spy/categories", { name });
  return res.data;
}

export async function deleteSpyCategory(id: string) {
  await apiClient.delete(`/spy/categories/${id}`);
}

export async function getSpyWords() {
  const res = await apiClient.get<SpyWord[]>("/spy/words");
  return res.data;
}

export async function createSpyWord(payload: {
  word: string;
  categoryId: string;
}) {
  const res = await apiClient.post<SpyWord>("/spy/words", payload);
  return res.data;
}

export async function deleteSpyWord(id: string) {
  await apiClient.delete(`/spy/words/${id}`);
}
