import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";

/**
 * dynamic metadata
 */
// import type { Metadata, ResolvingMetadata } from "next";

// type Props = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).id;

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json());

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.title,
//     openGraph: {
//       images: ["/some-specific-page-image.jpg", ...previousImages],
//     },
//   };
// }

interface Frontmatter {
  title: string;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  //   const content = await fs.readFile(path.join(process.cwd(), 'src/projects', `${params.slug}.mdx`), 'utf-8');
  const content = await fs.readFile(
    path.join(process.cwd(), "src/blog", `${slug}.mdx`),
    "utf-8"
  );
  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      // Your Components here
    },
  });
  return (
    <div>
      <h1 className="text-red-500">{data.frontmatter.title}</h1>
      {data.content}
    </div>
  );
}

// resource: https://spacejelly.dev/posts/mdx-in-nextjs
