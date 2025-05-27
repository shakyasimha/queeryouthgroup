"use client";

import React, { useState } from 'react';
import { alegreyaSans } from '@/ui/fonts';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const images = [
  '/images/event1.jpg',
  '/images/event2.jpg',
  '/images/event3.jpg',
];

const Slideshow = () => {
  return (
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        >
        {images.map((img, i) => (
            <SwiperSlide key={i}>
            <img src={img} alt={`Slide ${i + 1}`} className="w-full h-auto object-cover" />
            </SwiperSlide>
        ))}
        </Swiper>
    );
};

export default Slideshow;