"use client";

import { useState } from "react";
import { alegreyaSans, roboto } from "@/ui/fonts";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Section = {
  title: string;
  content: string;
  image: string;
};

export default function Page() {
  const t = useTranslations("WorkPage");
  const sections = Object.values(t.raw("sections")) as Section[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
      <div className="flex flex-col items-center min-h-[30vh]">
        {/* Page Title and Subtitle */}
        <div className="text-center text-2xl">
          <h1 className={`${alegreyaSans.className} text-black py-4 font-bold mt-4`}>
            {t("title")}
          </h1>
          <h2 className={`${alegreyaSans.className} text-black text-lg py-4 font-bold`}>
            {t("subtitle")}
          </h2>
        </div>

        {/* Grid of Cards */}
        <div className="w-full px-4 md:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => {
            const isLastAndAlone =
              sections.length % 3 === 1 && index === sections.length - 1;

            return (
              <button
                key={index}
                onClick={() =>
                  setActiveIndex(index === activeIndex ? null : index)
                }
                className={`cursor-pointer bg-[#f5efe0] rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center justify-center ${
                  isLastAndAlone ? "lg:col-start-2" : ""
                }`}
              >
                <div className="w-24 h-24">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3
                  className={`${alegreyaSans.className} text-center mt-4 text-[#d41367] font-bold text-lg`}
                >
                  {section.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
