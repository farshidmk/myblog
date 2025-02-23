import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import CategoryChip from "./components/CategoryChip";
import TagChip from "./components/TagChip";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
      {blogs.map(({ title, slug, description, preview, categories, tags }) => {
        return (
          <Link href={`/blog/${slug}`} key={slug} className="">
            <div className="bg-slate-400 rounded-xl p-3">
              <Image src={preview!} alt={slug} width={300} height={300} />
              <h6 className="text-base font-bold text-center">{title}</h6>
              <p className="truncate text-xs">{description}</p>
              <div className="flex gap-1 flex-wrap flex-row-reverse mb-1 mt-2">
                {categories?.map((category) => (
                  <CategoryChip key={category} category={category} />
                ))}
              </div>
              <div className="flex gap-1 flex-wrap flex-row-reverse">
                {tags?.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default page;

/**
 * TODO:
 * [] - create default blog image and show in blog post without image
 * [] - add style to blog card
 */
