import { alegreyaSans, roboto } from "@/ui/fonts"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Page() {
    const t = useTranslations('TeamRootPage');

    return(
        <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
            <div className="flex flex-col items-center min-h-[30vh] mt-4">
                <div className="text-center text-2xl">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold`}>
                        {t('title')}
                    </h1>
                </div>

                <div className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <div className="flex flex-col space-y-4">
                        <Link href="/about/team/board" className="text-black hover:text-black-600 hover:underline">
                            {t('boardLink')}
                        </Link>
                        <Link href="/about/team/alumni" className="text-black hover:text-black-600 hover:underline">
                            {t('alumniLink')}
                        </Link>
                        <Link href="/about/team/staff" className="text-black hover:text-black-600 hover:underline">
                            {t('staffLink')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}