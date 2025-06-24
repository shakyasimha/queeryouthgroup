import Link from "next/link";
import { openSans, alegreyaSans } from "@/ui/fonts";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { footerContent } from "@/data/footer-content";

export default function Footer({ lang = "en" }: { lang?: "en" | "np" }) {
  const content = footerContent[lang];

  return (
    <footer className={`${openSans.className} text-[#333] bg-[#cccffe] py-6`}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row">
        {/* Contact Info */}
        <div className="flex-1 py-4 flex flex-col gap-2 sm:m-0 m-4">
          <div className={`${alegreyaSans.className} font-bold text-xl py-2`}>
            {content.title}
          </div>

          <div className="flex flex-row space-x-3 items-center">
            <FaLocationDot size={16} />
            <Link href="https://maps.app.goo.gl/6apehbLTBEmZGDva8" className="hover:text-[#333]/80">
              {content.address}
            </Link>
          </div>

          <div className="flex flex-row space-x-3 items-center">
            <FaEnvelope size={16} />
            <Link href={`mailto:${content.email}`} className="hover:text-[#333]/80">
              {content.email}
            </Link>
          </div>

          <div className="flex flex-row space-x-3 items-center">
            <FaPhone size={16} />
            <div>{content.phone}</div>
          </div>
        </div>

        {/* Resources */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-xl py-2`}>
            {content.sections.resources}
          </div>
          <ul className="decoration-0 gap-2">
            {content.resources.map((item) => (
              <li key={item.name} className="py-2">
                <Link href={item.href} className="hover:text-[#333]/80">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-xl py-2`}>
            {content.sections.links}
          </div>
          <ul className="decoration-0 gap-2">
            {content.links.map((item) => (
              <li key={item.name} className="py-2">
                <Link href={item.href} className="hover:text-[#333]/80">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-xl py-2`}>
            {content.sections.connect}
          </div>
          <div className="flex flex-row space-x-6 mt-2">
            {content.socialMedia.map((item) => {
              const icons = {
                FaFacebook,
                FaInstagram,
                FaXTwitter,
              };
              const Icon = icons[item.icon as keyof typeof icons];
              
              return (
                <Link key={item.name} href={item.href} className="hover:text-[#333]/80">
                  {Icon && <Icon size={24} />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-[90%] h-[1px] bg-gray-400 mt-6"></div>
      <div className="text-center text-xs mt-4">{content.copyright}</div>
    </footer>
  );
}