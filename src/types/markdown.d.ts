type BlogTags = "learning" | "book";
type LearningCategory = "Nextjs";

type Frontmatter = {
  title: string;
  createDate: Date;
  tag: BlogTags;
  gategory?: LearningCategory;
  description: string;
  imgSrc?: string;
  Auther?: string;
  AutherImg?: string;
};
