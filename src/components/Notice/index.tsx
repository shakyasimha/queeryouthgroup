"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  '/images/banda-notice-08.jpg',
  '/images/banda-notice-09-09-09.jpg',
];

export default function Notice() {
  return (
    <div className="w-[400px] h-[400px] lg:h-[800px] lg:w-[800px] relative group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={false} // Disabled round pagination buttons
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
        
        {/* Custom minimal arrows */}
        <div className="swiper-button-prev !left-2 !w-8 !h-8 after:!text-xl after:!text-white after:!opacity-80 hover:after:!opacity-100 !hidden group-hover:!block"></div>
        <div className="swiper-button-next !right-2 !w-8 !h-8 after:!text-xl after:!text-white after:!opacity-80 hover:after:!opacity-100 !hidden group-hover:!block"></div>
      </Swiper>

      <style jsx global>{`
        .swiper-button-prev:after, 
        .swiper-button-next:after {
          font-size: 1.5rem;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .swiper-button-prev,
        .swiper-button-next {
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(2px);
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          transition: all 0.3s ease;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}