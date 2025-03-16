import { AvalonRole, AvalonRoleName } from "./avalon-types";
import { z } from "zod";

export const AVALON_ROLES: AvalonRole[] = [
  {
    id: 1,
    name: "Merlin",
    isEvil: false,
    imgUrl: "/images/avalon/merlin.png",
  },
  {
    id: 2,
    name: "Morgana",
    isEvil: true,
    imgUrl: "/images/avalon/morgana.png",
  },
  {
    id: 3,
    name: "Percival",
    isEvil: false,
    imgUrl: "/images/avalon/percival.png",
  },

  {
    id: 4,
    name: "Assassin",
    isEvil: true,
    imgUrl: "/images/avalon/assassin.png",
  },
  {
    id: 5,
    name: "Devil",
    isEvil: true,
    imgUrl: "/images/avalon/devil.png",
  },
  {
    id: 10,
    name: "Mordred",
    isEvil: true,
    imgUrl: "/images/avalon/mordred.png",
  },
  {
    id: 6,
    name: "Loyal Servant",
    isEvil: false,
    imgUrl: "/images/avalon/loyalServant.png",
  },
  // {
  //   id: 7,
  //   name: "Loyal Servant",
  //   isEvil: false,
  //   imgUrl: "/images/avalon/loyalServant.png",
  // },
  // {
  //   id: 8,
  //   name: "Loyal Servant",
  //   isEvil: false,
  //   imgUrl: "/images/avalon/loyalServant.png",
  // },
  // {
  //   id: 9,
  //   name: "Loyal Servant",
  //   isEvil: false,
  //   imgUrl: "/images/avalon/loyalServant.png",
  // },
  {
    id: 11,
    name: "Oberon",
    isEvil: true,
    imgUrl: "/images/avalon/oberon.png",
  },
  {
    id: 12,
    name: "King Arthur",
    isEvil: false,
    imgUrl: "/images/avalon/kingArthur.png",
  },
] as const;

export const avalonGameUsersInputValidation = z.object({
  name: z.string().min(1, "نام بازیکن را وارد کنید"),
});

export const MISSION_REQUIREMENTS = {
  5: { team: [2, 3, 2, 3, 3], fails: [1, 1, 1, 1, 1] },
  6: { team: [2, 3, 4, 3, 4], fails: [1, 1, 1, 1, 1] },
  7: { team: [2, 3, 3, 4, 4], fails: [1, 1, 1, 2, 1] },
  8: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
  9: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
  10: { team: [3, 4, 4, 5, 5], fails: [1, 1, 1, 2, 1] },
};

/**
 * Available roles for each number of players
 */
export const AVAILABLE_ROLES_BY_PLAYERS_COUNT: Record<
  number,
  AvalonRoleName[]
> = {
  5: ["Mordred", "Assassin", "Merlin", "Loyal Servant", "Loyal Servant"],
  6: [
    "Assassin",
    "Morgana",
    "Merlin",
    "Percival",
    "Loyal Servant",
    "Loyal Servant",
  ],
  7: [
    "Oberon",
    "Assassin",
    "Morgana",
    "Merlin",
    "Percival",
    "Loyal Servant",
    "Loyal Servant",
  ],
  8: [
    "Devil",
    "Assassin",
    "Morgana",
    "Merlin",
    "Percival",
    "Loyal Servant",
    "Loyal Servant",
    "Loyal Servant",
  ],
  9: [
    "Mordred",
    "Assassin",
    "Morgana",
    "Merlin",
    "Percival",
    "Loyal Servant",
    "Loyal Servant",
    "Loyal Servant",
    "Loyal Servant",
  ],
  10: [
    "Mordred",
    "Oberon",
    "Assassin",
    "Morgana",
    "Merlin",
    "Percival",
    "Loyal Servant",
    "Loyal Servant",
    "Loyal Servant",
    "King Arthur",
  ],
};
