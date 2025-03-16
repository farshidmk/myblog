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

export const ROLE_DESCRIPTIONS: Record<AvalonRoleName, string> = {
  Mordred:
    "موردرد برای تسلط به بریتانیا لشگری جمع کرده‌ است و قصد کشتن شاه آرتور را دارد. با استفاده از توانایی‌های که دارد مرلین نمی‌تواند موردرد را شناسایی کند و در ابتدای بازی به مرلین معرفی نمی‌شود.",
  Oberon:
    "موردرد به اوبران دستور داده است تا به صورت ناشناس به لشگر اهریمن کمک کند. اوبران یارهای خود را نمی‌شناسد و یارهای او نیز اوبران را نمی‌شناسند. اما در ابتدای بازی اوبران به مرلین، همراه بقیه اعضای لشگر اهریمن معرفی خواهد شد.",
  Assassin:
    "اسسین از سرکرده‌های موردرد هست که وظیفه دارد مرلین را به قتل برساند. در صورتی که لشگر اهریمن در ماموریت‌ها شکست بخورد، اسسین یک شانس دارد تا با کشتن مرلین، لشگر اهریمن را پیروز میدان کند.",
  Morgana:
    "به دستور موردرد مورگانا خود را به شکل مرلین در آورده است تا پرسیوال را گمراه کند. در ابتدای بازی پرسیوال، مورگانا و مرلین را می‌شناسد و مورگانا باید سعی کند طوری بازی کند تا پرسیوال به او اعتماد کند.",
  Merlin:
    "مرلین پیشگوی شاه آرتور هست و از حمله لشگر اهریمن با خبر می‌باشد. اما نباید هویت مرلین فاش شود. در شروع بازی تمامی لشگر اهریمن به جز موردرد به مرلین معرفی می‌شوند. در صورتی که در انتهای بازی لشگر اهریمن در ماموریت‌ها شکست بخورد و مرلین را به درستی حدس بزند، برنده میدان خواهد شد.",
  Percival:
    "پرسیوال از شاگردان مرلین هست که به کمک لشگر شاه آرتور آمده. مورگانا که از سرکرده‌های موردرد هست، خود را به شکل مرلین در آورده و در ابتدای بازی مرلین و مورگانا به شما معرفی می‌شوند. در طول بازی باید مرلین را شناسایی کنید و سعی کنید از هویت مرلین محافظت کنید.",
  "Loyal Servant":
    "شاه آرتور تعدادی خدمتکار وفادار دارد که در طول بازی باید به لشگر خیر وفادار بماننداطلاعاتی از بقیه افراد وفادار ندارید و با توجه به روند بازی باید سعی کنید به لشگر خیر در پیروزی کمک کنید.",
  Devil:
    "موردرد تعدادی سرسپرده دارد که سعی کنند برای پیروزی لشگر اهریمن مبارزه کنند. قابلیت خاصی ندارند و تنها در ابتدای بازی، بقیه اعضای لشگر اهریمن را می‌شناسند.",
  "King Arthur":
    "لشگر اهریمن به شاه آرتور حمله کرده است و باید با کمک یاران خود آن‌ها را شکست دهد. زمانی که اهریمن در ماموریت‌ها برنده شود، شاه آرتور فرصت دارد در صورتی که همه اهمرین‌ها را به درستی حدس بزند، تیم خیر شکست نخورد. همچنین اگر درست حدس زد، اهریمن فرصت دارد که مرلین را بکشد.",
} as const;
