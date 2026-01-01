"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, Code2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/farshidmk",
      color: "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/farshidmk",
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:farshid@example.com",
      color: "hover:text-primary",
    },
  ];

  const quickLinks = [
    { title: "خانه", path: "/" },
    { title: "بلاگ", path: "/blog" },
    { title: "بازی‌ها", path: "/games" },
    { title: "درباره من", path: "#about" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hire Me Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm animate-bounce-slow">
              <Code2 size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            بیا با هم کار کنیم!
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in animation-delay-200 max-w-2xl mx-auto">
            اگر دوست دارید توی پروژه‌ای همکاری کنیم یا نیاز به انجام پروژه‌ای
            دارید، خوشحال می‌شم که بتونم کمک کنم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <a
              href="mailto:farshid@example.com"
              className="btn btn-lg bg-white text-primary hover:bg-lightBg border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} className="ml-2" />
              ارسال ایمیل
            </a>
            <a
              href="tel:+989123456789"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Phone size={20} className="ml-2" />
              تماس تلفنی
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-4">فرشید</h3>
            <p className="text-gray-300 leading-relaxed">
              برنامه‌نویس وب و عاشق یادگیری. متخصص در React، Next.js و
              Node.js. همیشه در حال یادگیری و به اشتراک‌گذاری دانش.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">ایمیل</p>
                  <a
                    href="mailto:farshid@example.com"
                    className="hover:text-primary transition-colors"
                  >
                    farshid@example.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">تلفن</p>
                  <a
                    href="tel:+989123456789"
                    className="hover:text-primary transition-colors"
                  >
                    +98 912 345 6789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">موقعیت</p>
                  <p>تهران، ایران</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>
            © {currentYear} فرشید. تمامی حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-2">
            ساخته شده با{" "}
            <span className="text-red-500 animate-pulse">❤</span> با Next.js
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  );
}
