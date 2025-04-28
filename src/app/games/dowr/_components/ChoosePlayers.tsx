"use client";

import { useQuery } from "@tanstack/react-query";
import useDowrGame from "../_hooks/useDowrGameProvider";
import { GameWordCategory } from "@prisma/client";
import UserInputWrapper from "@/components/ui/userInputWrapper/UserInputWrapper";
import { NUMBER_OF_PLAYERS } from "../_constants/dowrPlayer";

const ChoosePlayers = () => {
  const { setWordsDifficulty, setGameStep, setPlayers } = useDowrGame();
  const { data, status } = useQuery<
    ActionResponse<GameWordCategory[]>,
    Error,
    GameWordCategory[]
  >({
    queryKey: ["/api/games/category"],
    select: (res) => res.data || [],
  });
  return (
    <div>
      <form>
        <UserInputWrapper label="تعداد بازیکنان">
          {/* <select id="">
            {NUMBER_OF_PLAYERS.map(num => <option ></option>)}
            key={num}
            value={num})
            </select> */}
        </UserInputWrapper>
      </form>
    </div>
  );
};

export default ChoosePlayers;
