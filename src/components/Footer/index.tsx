import Link from "next/link";
import { openSans, alegreyaSans } from "@/ui/fonts";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={`${openSans.className} text-[#333] bg-[#cccffe] py-6`}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row">
        {/* Communication Links in English */}
          <div className="flex-1 py-4 flex flex-col gap-2 sm:m-0 m-4">
            <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl py-2`}>Queer Youth Group</div>

            {/* Office physical address link */}
            <div className="flex flex-row space-x-3 items-center">
              <FaLocationDot size={16} className="text-[#333]" />
              <Link
                key="location"
                href="https://maps.app.goo.gl/6apehbLTBEmZGDva8"
                className="hover:text-[#333]/80 transition duration-400"
              >
                Yala Dhwakha (Patandhoka), Lalitpur-11, Nepal
              </Link>
            </div>

            {/* Email address */}
            <div className="flex flex-row space-x-3 items-center">
              <FaEnvelope size={16} className="text-[#333]" />
              <Link
                key="email"
                href="mailto:communications.qyg@gmail.com"
                className="hover:text-[#333]/80 transition duration-400"
              >
                communications.qyg@gmail.com
              </Link>
            </div>

            {/* Phone number */}
            <div className="flex flex-row space-x-3 items-center">
              <FaPhone size={16} className="text-[#333]" />
              <div>+977 9851350665</div>
            </div>
          </div>

                {/* Resources */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl py-2`}>
            Resources
          </div>

          <ul className="decoration-0 gap-2">
            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                SOGEISC Dictionary
              </Link>
            </li>

            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                Legal documents
              </Link>
            </li>

            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                Publications
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful links */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl py-2`}>
            Links
          </div>

          <ul className="decoration-0 gap-2">
            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                Home
              </Link>
            </li>
            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                About Us
              </Link>
            </li>

            <li className="py-2">
              <Link
                key=""
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#333]/80 transition duration-400"
              >
                Our Team
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex-1 py-4 flex flex-col sm:mx-16 sm:my-0 mx-4">
          <div className={`${alegreyaSans.className} font-bold text-[#333] text-xl py-2`}>Connect With Us</div>

          <div className="flex flex-row space-x-6 mt-2">
            {/* Facebook icon */}
            <Link
              key="facebook"
              href="https://www.facebook.com/QYGnepal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#333]/80 transition duration-400"
            >
              <FaFacebook size={24} />
            </Link>

            {/* Instagram icon */}
            <Link
              key="instagram"
              href="https://www.instagram.com/qygnepal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#333]/80 transition duration-400"
            >
              <FaInstagram size={24} />
            </Link>

            {/* X/Twitter icon */}
            <Link
              key="twitter"
              href="https://www.instagram.com/qygnepal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#333]/80 transition duration-400"
            >
              <FaXTwitter size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="mx-auto w-[90%] h-[1px] bg-gray-400 mt-6"></div>

      {/* Bottom text */}
      <div className="text-center text-xs mt-4">
        &copy; {new Date().getFullYear()} Queer Youth Group. All rights reserved.
      </div>
    </footer>
  );
}
