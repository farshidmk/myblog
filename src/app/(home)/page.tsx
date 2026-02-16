import Link from "next/link";
import {
  Code2,
  Gamepad2,
  BookOpen,
  Wrench,
  Github,
  Linkedin,
} from "lucide-react";
import AnimatedBackground from "./_components/AnimatedBackground";
import CodeAnimation from "./_components/CodeAnimation";
import FloatingIcons from "./_components/FloatingIcons";
import SkillIcons from "./_components/SkillIcons";

export default function Home() {
  const features = [
    {
      icon: <Gamepad2 size={32} />,
      title: "بازی‌ها",
      description: "بازی‌های جذاب و سرگرم‌کننده مثل آوالون، دور و جاسوس",
      color: "bg-primary",
      link: "/games",
    },
    {
      icon: <BookOpen size={32} />,
      title: "یادگیری",
      description: "خلاصه کتاب‌ها، تجربیات و مطالب مفید برنامه‌نویسی",
      color: "bg-accent",
      link: "/blog",
    },
    {
      icon: <Wrench size={32} />,
      title: "ابزارها",
      description: "ابزارهای کاربردی برای توسعه‌دهندگان و کاربران",
      color: "bg-secondary",
      link: "#tools",
    },
    {
      icon: <Code2 size={32} />,
      title: "پروژه‌ها",
      description: "نمونه کارها و پروژه‌های شخصی من",
      color: "bg-primary",
      link: "#projects",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-mainBg via-white to-lightBg overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingIcons />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-center md:text-right z-10">
            <div className="inline-block">
              <h1 className="text-5xl md:text-7xl font-bold mb-2 animate-slide-in-right">
                سلام! من{" "}
                <span className="text-primary relative inline-block">
                  فرشید
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4 Q50 0, 100 4 T200 4"
                      stroke="#006d77"
                      strokeWidth="3"
                      fill="none"
                      className="animate-draw"
                    />
                  </svg>
                </span>{" "}
                هستم
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 animate-slide-in-right animation-delay-200">
              برنامه‌نویس وب و عاشق{" "}
              <span className="text-accent font-bold">یادگیری</span>
            </p>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0 animate-slide-in-right animation-delay-400">
              توی این سایت، چیزهایی که برای خودم مفید بوده مثل بازی‌ها، ابزارها
              و تجربه‌هایی که داشتم رو به اشتراک می‌ذارم. اینجا جاییه برای{" "}
              <span className="text-primary font-semibold">یادگیری</span>،{" "}
              <span className="text-accent font-semibold">سرگرمی</span> و{" "}
              <span className="text-secondary font-semibold">همکاری</span>!
            </p>

            <div className="flex gap-4 justify-center md:justify-start animate-slide-in-right animation-delay-600">
              <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                دانلود رزومه
              </button>
              <Link href="/blog">
                <button className="btn btn-outline btn-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:text-black">
                  مشاهده بلاگ
                </button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-4 animate-slide-in-right animation-delay-800">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Code Animation */}
          <div className="flex-1 animate-slide-in-left">
            <CodeAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            چی توی این سایت پیدا می‌کنی؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index}>
                <div
                  className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div
                    className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10`}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 relative z-10">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            ابزارها و زبان‌هایی که می‌شناسم
          </h2>

          <SkillIcons />
        </div>
      </section>
    </main>
  );
}
