type Props = {
  category: BlogCategory;
};

const CategoryChip = ({ category }: Props) => {
  switch (category) {
    case "learning":
      return (
        <div className="text-sm  rounded-2xl bg-blue-100 py-1 px-2 border border-blue-700 flex items-center justify-center text-blue-700">
          Learning
        </div>
      );

    default:
      break;
  }
  return <div>{category}</div>;
};

export default CategoryChip;
