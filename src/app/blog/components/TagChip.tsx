import Image from "next/image";

type Props = {
  tag: BlogTags;
};

const TagChip = ({ tag }: Props) => {
  switch (tag) {
    case "Nextjs":
      return (
        <div className="flex gap-1 text-xs rounded-3xl bg-gray-100 px-2 p-1 items-center justify-center border border-gray-600">
          <span>NextJs</span>
          <Image
            width={20}
            height={20}
            src={"/assets/icons/nextjs.png"}
            alt="Nextjs"
          />
        </div>
      );

    default:
      break;
  }
  return <div className="text-base rounded-2xl bg-gray-400 p-2">{tag}</div>;
};

export default TagChip;
