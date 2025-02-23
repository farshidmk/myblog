type Props = {
  category: BlogCategory;
};

const CategoryChip = ({ category }: Props) => {
  switch (category) {
    case "learning":
      return (
        <div className="text-xs font-bold rounded-2xl bg-purple-200 py-1 px-2 border border-purple-800 flex items-center justify-center">
          Learning
        </div>
      );

    default:
      break;
  }
  return <div>{category}</div>;
};

export default CategoryChip;
