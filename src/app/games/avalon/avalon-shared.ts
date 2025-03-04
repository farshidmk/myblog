import { AvalonRole } from "./avalon-types";
import { z } from "zod";

export const AVALON_ROLES: AvalonRole[] = [
  {
    id: 1,
    name: "Merlin",
    isEvil: false,
    imgUrl: "/public/images/avalon/merlin.png",
  },
  {
    id: 2,
    name: "Morgana",
    isEvil: true,
    imgUrl: "/public/images/avalon/morgana.png",
  },
  {
    id: 3,
    name: "Percival",
    isEvil: false,
    imgUrl: "/public/images/avalon/percival.png",
  },

  //TODO: add image for these roles
  {
    id: 4,
    name: "Assassin",
    isEvil: true,
    imgUrl: "/public/images/avalon/percival.png",
  },
  {
    id: 5,
    name: "Oberon",
    isEvil: true,
    imgUrl: "/public/images/avalon/percival.png",
  },
  {
    id: 10,
    name: "Mordered",
    isEvil: true,
    imgUrl: "/public/images/avalon/percival.png",
  },
  {
    id: 6,
    name: "Loyal Servant",
    isEvil: false,
    imgUrl: "/public/images/avalon/royalServant.png",
  },
  {
    id: 7,
    name: "Loyal Servant",
    isEvil: false,
    imgUrl: "/public/images/avalon/royalServant.png",
  },
  {
    id: 8,
    name: "Loyal Servant",
    isEvil: false,
    imgUrl: "/public/images/avalon/royalServant.png",
  },
  {
    id: 9,
    name: "Loyal Servant",
    isEvil: false,
    imgUrl: "/public/images/avalon/royalServant.png",
  },
];

export const avalonGameUsersInputValidation = z.object({
  name: z.string().min(1, "نام بازیکن را وارد کنید"),
});
