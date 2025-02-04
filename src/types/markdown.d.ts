type BlogTags = "Nextjs";
type LearningCategory = "learning" | "book";

type Frontmatter = {
  title: string;
  date: string;
  tags?: BlogTags[];
  categories?: LearningCategory[];
  description: string;
  preview?: string;
  Auther?: string;
  AutherImg?: string;
};
