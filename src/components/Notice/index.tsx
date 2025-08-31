// Notice/index.tsx

"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import { getLocalizedPostWithFallback } from "@/lib/getLocalizedPostWithFallback";
import { urlFor } from "@/sanity/lib/imageUrl"; // standard sanity image builder

export default function Notice() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticeImages() {
      try {
        // fetch the post with slug = "notice"
        const post = await getLocalizedPostWithFallback("en", "notice");

        if (post?.body) {
          // filter out only images
          const urls = post.body
            .filter((block: any) => block._type === "image" && block.asset)
            .map((block: any) => urlFor(block).width(1200).url());

          setImages(urls);
        }
      } catch (err) {
        console.error("Error fetching notice images from Sanity:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNoticeImages();
  }, []);

  if (isLoading || images.length === 0) return null;

  return (
    <div className="w-[400px] h-[400px] lg:h-[800px] lg:w-[800px] relative group">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
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
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Chevron Arrows */}
        <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/50">
          <ChevronLeft size={24} />
        </button>
        <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/50">
          <ChevronRight size={24} />
        </button>
      </Swiper>
    </div>
  );
}
