import { Metadata } from "next";
import GameHandler from "./components/GameHandler";

//https://tgmafia.com/how-play-avalon/

export const metadata: Metadata = {
  title: `Avalon game | 😎`,
  description:
    "اولون یک بازی گروهی و استراتژیک با تم فانتزی و خیانت است که در آن بازیکنان در نقش شخصیت‌های خوب و بد برای پیروزی در مأموریت‌ها رقابت می‌کنند. تشخیص دروغ و فریب کلید موفقیت در این بازی پرهیجان است",
  openGraph: {
    images: [
      {
        url: "/images/avalon/logo.png",
      },
    ],
  },
};

const AvalonGame = () => {
  return <GameHandler />;
};

export default AvalonGame;
