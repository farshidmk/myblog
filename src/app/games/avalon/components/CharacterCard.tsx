import { AvalonRole } from '../avalon-types';

const CharacterCard = ({ imgUrl, isEvil, name }: AvalonRole) => {
  return (
    <div
      className={`flex flex-col gap-0 w-28 h-fit shadow-2xl  rounded-md ${
        isEvil ? 'shadow-red-600' : 'shadow-blue-600'
      }`}
    >
      <img src={imgUrl} alt={name} className="rounded-t-xl" />
      <p className={`text-white ${isEvil ? 'bg-red-500' : 'bg-blue-600'} fansy-font text-center rounded-b-xl`}>
        {isEvil ? 'Evil' : 'Good'}
      </p>
    </div>
  );
};

export default CharacterCard;
