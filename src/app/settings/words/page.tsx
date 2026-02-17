"use client";

import ListOfWords from "./_components/ListOfWords";
import SelectCategory from "./_components/SelectCategory";

export default function WordsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12 space-y-6">
      <SelectCategory />
      <ListOfWords />
    </main>
  );
}
