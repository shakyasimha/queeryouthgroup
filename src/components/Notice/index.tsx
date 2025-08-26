"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function Notice() {
  /* This section is for fetching image from slugs */
  // const [images, setImages] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchNoticeImages() {
  //     try {
  //       // Wordpress slug is here
  //       const res = await fetch(
  //         "https://queeryouthgroup.org.np/wp-json/wp/v2/posts?slug=notice"
  //       );
  //       const data = await res.json();

  //       if (data.length > 0) {
  //         const content = data[0].content.rendered;

  //         // Regex to extract all <img src="..."> URLs
  //         const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  //         const urls: string[] = [];
  //         let match;
  //         while ((match = imgRegex.exec(content)) !== null) {
  //           urls.push(match[1]);
  //         }

  //         setImages(urls);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching notice images:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchNoticeImages();
  // }, []);

  // // Don't render anything if loading or no images found
  // if (isLoading || images.length === 0) {
  //   return null;
  // }

  /* This section is for fetching images locally when slugs aren't working */
  const [images, setImages] = useState([]);

  useEffect(()=>{
    const fetchImagesFromPublic = () => {
      const imagePaths = [
        '/images/notice/banda-notice-08.jpg',
        '/images/notice/banda-notice-09-09-09.jpg'
      ];

      setImages(imagePaths);
    };

    fetchImagesFromPublic();
  }, []);


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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
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