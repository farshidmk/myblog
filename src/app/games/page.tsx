import Image from "next/image";
import Link from "next/link";
import React from "react";

const GamePage = () => {
  return (
    <div className="flex items-center gap-2 p-3">
      {GAMES.map(({ description, imageUrl, title, url, color }) => (
        <Link key={url} href={url}>
          <div
            className={`max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gray-900 text-white border border-gray-700 cursor-pointer hover:shadow-xl hover:shadow-${
              color ?? "red-600"
            } transition-all`}
          >
            <Image
              className="w-full h-48 object-cover hover:scale-110 transition-all"
              src={imageUrl}
              alt={title}
              width={400}
              height={500}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GamePage;

type GameTitle = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  color?: string;
};

const GAMES: GameTitle[] = [
  {
    imageUrl: "/images/avalon/logo.png",
    title: "Avalon",
    description:
      "اولون یک بازی گروهی و استراتژیک با تم فانتزی و خیانت است که در آن بازیکنان در نقش شخصیت‌های خوب و بد برای پیروزی در مأموریت‌ها رقابت می‌کنند. تشخیص دروغ و فریب کلید موفقیت در این بازی پرهیجان است",
    url: "/games/avalon",
    color: "red-600",
  },
];
