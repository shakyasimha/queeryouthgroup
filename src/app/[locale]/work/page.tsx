import { alegreyaSans, roboto } from "@/ui/fonts";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Section = {
  title: string;
  content: string;
  image: string;
};

export default function Page() {
    const t = useTranslations('WorkPage');
    const sections = Object.values(t.raw('sections')) as Section[];

    return(
        <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
            <div className="flex flex-col items-center min-h-[30vh]">
                <div className="text-center text-2xl">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold mt-4`}>
                        {t('title')}
                    </h1>
                    <h2 className={`${alegreyaSans.className} text-black text-lg py-4 font-bold`}>
                        {t('subtitle')}
                    </h2>
                </div>

                <div className={`${roboto.className} text-bg text-justify px-4 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                        {t('paragraph')}
                    </p>
                    <p className="mt-2">
                        {t('listIntro')}
                    </p>
                    <div className="mt-2 mb-16 space-y-8">
                        {sections.map((section, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Numbering */}
                                <div className="flex items-start">
                                    <span className={`${alegreyaSans.className} text-3xl font-bold text-[#d41367]`}>
                                        {index + 1}.
                                    </span>
                                </div>
                                
                                {/* Content + Image */}
                                <div className="flex-1">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div className="flex-1">
                                            <h3 className={`${alegreyaSans.className} text-xl font-bold mb-2`}>
                                                {section.title}
                                            </h3>
                                            <p className="my-2">
                                                {section.content}
                                            </p>
                                        </div>
                                        
                                        {/* Image */}
                                        <div className="lg:w-1/3 flex-shrink-0">
                                            <Image
                                                src={section.image}
                                                alt={section.title}
                                                width={300}
                                                height={200}
                                                className="rounded-lg object-cover w-full h-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}