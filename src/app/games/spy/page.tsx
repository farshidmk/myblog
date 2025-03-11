"use client";
import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface Word {
  id: string;
  word: string;
  categoryId: string;
}

const SpyGamePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newWord, setNewWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories and words
  useEffect(() => {
    fetchCategories();
    fetchWords();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/spy/categories");
    const data = await response.json();
    setCategories(data);
  };

  const fetchWords = async () => {
    const response = await fetch("/api/spy/words");
    const data = await response.json();
    setWords(data);
  };

  // Category CRUD operations
  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/spy/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    setNewCategory("");
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    await fetch(`/api/spy/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  // Word CRUD operations
  const addWord = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/spy/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: newWord,
        categoryId: selectedCategory,
      }),
    });
    setNewWord("");
    fetchWords();
  };

  const deleteWord = async (id: string) => {
    await fetch(`/api/spy/words/${id}`, { method: "DELETE" });
    fetchWords();
  };

  return (
    <div className="p-4">
      {/* Category Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <form onSubmit={addCategory} className="mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="border p-2 mr-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </form>

        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border p-4 rounded">
              <p>{category.name}</p>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Word Management */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Words</h2>
        <form onSubmit={addWord} className="mb-4">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="New Word"
            className="border p-2 mr-2 rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 mr-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Word
          </button>
        </form>

        <div className="grid grid-cols-3 gap-4">
          {words.map((word) => (
            <div key={word.id} className="border p-4 rounded">
              <p>{word.word}</p>
              <p className="text-sm text-gray-500">
                Category:{" "}
                {categories.find((c) => c.id === word.categoryId)?.name}
              </p>
              <button
                onClick={() => deleteWord(word.id)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpyGamePage;
