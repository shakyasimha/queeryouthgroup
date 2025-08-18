import { alegreyaSans, gulzar, jomolhari, notoSansNewa } from "@/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface HeaderProps {
  lang: "en" | "ne"; // Pass current locale as a prop
}

export default function Header({ lang }: HeaderProps) {
  return (
    <div className="bg-[#F5EFE0] text-[#d41367] w-full">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          {/* Logo + Text Group */}
          <div className="flex items-center md:items-center w-full md:w-auto gap-4">
            {/* Logo visible on all screen sizes */}
            <Link href="/" className="flex-shrink-0">
                <Image 
                    src="/qyg-logo.svg"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="block"
                />
            </Link>

            {/* Text container */}
            <div className="flex flex-col ml-4 justify-center items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              {/* Mobile: show only current locale */}
              <div className="flex flex-col items-center gap-2 md:hidden">
                {lang === "en" ? (
                  <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                    Queer Youth Group
                  </span>
                ) : (
                  <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                    क्वेयर युथ ग्रुप
                  </span>
                )}
              </div>

              {/* Desktop: show all languages */}
              <div className="hidden md:flex md:flex-row items-center gap-2 md:gap-16 mb-2">
                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                  Queer Youth Group
                </span>
                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                  क्वेयर युथ ग्रुप
                </span>
                <span className={`${notoSansNewa.className} font-bold whitespace-nowrap text-xl text-center`}>
                  𑐎𑑂𑐰𑐾𑐫𑐬 𑐫𑐸𑐠 𑐐𑑂𑐬𑐸𑐥
                </span>
                <span className={`${gulzar.className} font-bold whitespace-nowrap text-xl text-center`}>
                  کْوَییرَ یُتھَ گْرُپ
                </span>
              </div>

              <div className="hidden md:flex md:flex-row items-center gap-2 md:gap-16">
                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                  𑂍𑂹𑂫𑂨𑂵𑂩 𑂨𑂳𑂟 𑂏𑂹𑂩𑂳𑂣
                </span>
                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                  ᤁᤫᤕᤣᤷ ᤕᤢᤌ᤻ ᤃᤪᤢᤵ
                </span>
                <span className={`${alegreyaSans.className} font-bold whitespace-nowrap text-xl text-center`}>
                  𑒏𑓂𑒫𑒨𑒹𑒩 𑒨𑒳𑒟 𑒑𑓂𑒩𑒳𑒣
                </span>
                <span className={`${jomolhari.className} font-bold whitespace-nowrap text-xl text-center`}>
                  ཀྭཡེར་ཡུཐ་གྲུཔ
                </span>
              </div>
            </div>
          </div>

          {/* Social media links (desktop only) */}
          <div className="hidden md:flex gap-6">
            <Link href="https://www.facebook.com/QYGnepal" target="_blank" rel="noopener noreferrer" className="hover:text-[#DD4285] transition duration-300 ease-in-out">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://www.instagram.com/qygnepal/" target="_blank" rel="noopener noreferrer" className="hover:text-[#DD4285] transition duration-300 ease-in-out">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://twitter.com/qygnepal/" target="_blank" rel="noopener noreferrer" className="hover:text-[#DD4285] transition duration-300 ease-in-out">
              <FaXTwitter size={24} />
            </Link>
            <Link href="https://www.tiktok.com/@queeryouthgroup/" target="_blank" rel="noopener noreferrer" className="hover:text-[#DD4285] transition duration-300 ease-in-out">
              <FaTiktok size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
