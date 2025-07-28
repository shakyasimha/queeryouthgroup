// import Image from "next/image";
import { alegreyaSans, roboto } from "@/ui/fonts";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
    const t = useTranslations('AboutPage');

    return(
        <div className="w-full flex flex-grow flex-col bg-[#fafafc]">
            {/* Image section and "Who We Are" */}
            <div 
                className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] relative overflow-hidden"
            >
                <Image 
                    key="aboutus"
                    src="/images/about-us-section.jpg"
                    alt="about us"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col items-center min-h-[30vh] mt-4"> 
                <div className="text-center text-2xl">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold`}>
                        {t('introduction.title')}
                    </h1>
                </div>

                
                <div className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                        {t('introduction.content')}
                    </p>
                </div>

                <div className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <div className="flex justify-center mb-4">
                        <Image 
                        src="/qyg-logo.svg"
                        alt="organization logo"
                        width={400}
                        height={400}
                        />
                    </div>
                    <p>
                        {t('logo.content')}
                    </p>
                </div>
                
                <div className="text-center text-2xl mt-4">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold`}> 
                        {t('aboutUs.title')}    
                    </h1>
                </div>

                <div className={`${roboto.className} text-bg text-justify mb-16 px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                        {t('aboutUs.content')}
                    </p>
                </div>
            </div>
        </div>
    )
}