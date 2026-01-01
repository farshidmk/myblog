"use client";

import { Code2, Gamepad2, BookOpen, Wrench } from "lucide-react";

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-[10%] animate-float opacity-20">
        <Code2 size={48} className="text-primary" />
      </div>
      <div className="absolute top-40 left-[15%] animate-float-delayed opacity-20">
        <Gamepad2 size={56} className="text-accent" />
      </div>
      <div className="absolute bottom-32 right-[20%] animate-float-slow opacity-20">
        <BookOpen size={52} className="text-secondary" />
      </div>
      <div className="absolute bottom-20 left-[10%] animate-float opacity-20">
        <Wrench size={44} className="text-primary" />
      </div>
    </div>
  );
}
