import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

const page = async () => {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/blog"));
  const blogs = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/blog", filename),
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
    <div className="grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-12 gap-4">
      {blogs.map(({ title, slug, description }) => {
        return (
          <Link href={`/blog/${slug}`} key={slug}>
            <div className="bg-slate-400 rounded-xl p-3">
              <h6 className="text-base font-bold">{title}</h6>
              <p className="truncate">{description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default page;
