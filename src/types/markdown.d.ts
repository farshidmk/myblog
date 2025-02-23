type BlogTags = "Nextjs" | "React.js";
type BlogCategory = "learning" | "book";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  tags?: BlogTags[];
  categories: BlogCategory[];
  draft?: boolean;
  keywords?: string[];
  preview?: string;
};
