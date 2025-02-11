import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {blogs.map(({ title, slug, description, preview, tags, categories }) => {
        return (
          <Link href={`/blog/${slug}`} key={slug}>
            <div className="bg-white rounded-xl p-5 border border-slate-300 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 group relative">
              <div className="flex justify-center mb-4">
                <Image
                  src={preview || "/md.png"}
                  alt={slug}
                  width={200}
                  height={200}
                  className="transition-all duration-300 ease-in-out transform group-hover:scale-110"
                />
              </div>
              <h6 className="text-xl font-semibold text-gray-800">{title}</h6>
              <p className="text-sm text-gray-600 truncate mt-2">
                {description}
              </p>

              <div className="mt-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-3 rounded-full border border-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories?.map((category) => (
                    <span
                      key={category}
                      className="bg-green-100 text-green-800 text-xs font-medium py-1 px-3 rounded-full border border-green-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default page;
