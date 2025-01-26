import Image from "next/image";
import myPhoto from "/public/images/me.jpg";

export default function Home() {
  return (
    <main>
      <div className="flex md:justify-between container flex-col justify-center items-center md:items-start md:flex-row mx-auto max-w-5xl mt-4  gap-4 md:mt-8">
        <Image
          src={myPhoto}
          alt="farshid"
          className="rounded-full w-60 h-60 shadow-2xl inset-1 object-cover"
        />
        <div className="md:w-1/2 w-full  p-2">
          <h1 className="text-4xl mb-3 text-center md:text-right font-bold">
            درباره <span className="text-primary font-bold">من</span> و{" "}
            <span className="text-accent font-bold">اینجا</span>
          </h1>
          <p className="text-center md:text-justify mt-4">
            سلام! من فرشید هستم، یک برنامه‌نویس وب با تجربه در React، Next.js و
            Node.js. توی این سایت، چیزهایی که برای خودم مفید بوده مثل بازی‌ها،
            ابزارها و تجربه‌هایی که داشتم رو به اشتراک می‌ذارم. اگر دوست دارید
            با هم توی پروژه‌ای همکاری کنیم یا نیاز به انجام پروژه‌ای دارید،
            خوشحال می‌شم که بتونم کمک کنم. اینجا جاییه برای یادگیری، سرگرمی و
            همکاری!
          </p>
          <div className="flex justify-center md:justify-start mt-4">
            <button className="btn btn-primary ">دانلود رزومه</button>
          </div>
        </div>
      </div>
      <div className="bg-mainBg mt-5">
        <div className="container mx-auto">
          <h1>
            teststs Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nihil vitae nesciunt optio, corporis officiis blanditiis perferendis
            quos, similique dolore accusamus porro ea, hic temporibus quis
            soluta cupiditate cumque et! Ipsam!
          </h1>
        </div>
      </div>
    </main>
  );
}
