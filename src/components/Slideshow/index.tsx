"use client";

import React, { useState } from 'react';
import { alegreyaSans } from '@/ui/fonts';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './slideshow.css';

const images = [
  '/images/ilga_2025.jpg',
  '/images/IMG_6795.jpg',
  '/images/nsl_round_1.jpg',
  '/images/4.-Nepal-Pride-Parade-2019.jpg',
  '/images/IMG_5290.jpg'
];

const Slideshow = () => {
  return (
        <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] relative overflow-hidden rounded-xl">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="w-full h-full"
            >
                {images.map((img, i) => (
                <SwiperSlide key={i}>
                    <img
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slideshow;