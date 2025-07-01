import { alegreyaSans, roboto } from "@/ui/fonts";
import { useTranslations } from "next-intl";

type Section = {
  title: string;
  content: string;
};

export default function Page() {
    const t = useTranslations('WorkPage');
    const sections = JSON.parse(JSON.stringify(t('sections'))) as Section[];
;

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
                    <div className="mt-2 mb-16">
                        <ol className="list-decimal pl-6"> 
                            {sections.map((section, index) => (
                                <li key={index}>
                                    <h3>
                                        {section.title}
                                    </h3>
                                    <p className="my-2">
                                        {section.content}
                                    </p>
                                </li>
                            ))}
                        </ol>    
                    </div>
                </div>
            </div>
        </div>
    )
}