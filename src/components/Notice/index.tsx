"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

export default function Notice() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticeImages() {
      try {
        // Wordpress slug is here
        const res = await fetch(
          "https://queeryouthgroup.org.np/wp-json/wp/v2/posts?slug=notice"
        );
        const data = await res.json();

        if (data.length > 0) {
          const content = data[0].content.rendered;

          // Regex to extract all <img src="..."> URLs
          const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
          const urls: string[] = [];
          let match;
          while ((match = imgRegex.exec(content)) !== null) {
            urls.push(match[1]);
          }

          setImages(urls);
        }
      } catch (err) {
        console.error("Error fetching notice images:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNoticeImages();
  }, []);

  // Don't render anything if loading or no images found
  if (isLoading || images.length === 0) {
    return null;
  }

  return (
    <div className="w-[400px] h-[400px] lg:h-[800px] lg:w-[800px] relative group">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`Notice ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Custom arrows */}
        <div className="swiper-button-prev !left-2 !w-8 !h-8 after:!text-xl after:!text-white after:!opacity-80 hover:after:!opacity-100 !hidden group-hover:!block"></div>
        <div className="swiper-button-next !right-2 !w-8 !h-8 after:!text-xl after:!text-white after:!opacity-80 hover:after:!opacity-100 !hidden group-hover:!block"></div>
      </Swiper>
    </div>
  );
}