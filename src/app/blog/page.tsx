import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

interface Frontmatter {
  title: string;
}

const page = async () => {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/projects"));
  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/projects", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      });
      return {
        filename,
        slug: filename.replace(".mdx", ""),
        ...frontmatter,
      };
    })
  );
  return (
    <ul>
      {projects.map(({ title, slug }) => {
        return (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default page;
