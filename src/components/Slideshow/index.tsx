import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 

const Slideshow = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative h-[70vh] w-full">
            {/* Slideshow */}
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                <SwiperSlide>
                    <img
                        src="/3.-Nepal-Pride-Parade-2019.jpg"
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/4.-Nepal-Pride-Parade-2019.jpg"
                        alt="Slide 2"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/2.-Trans-Pride-Parade-2020.jpg"
                        alt="Slide 3"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/IMG_6795.JPG"
                        alt="Slide 4"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/IMG_5290.jpg"
                        alt="Slide 5"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="swiper-pagination !bottom-4"></div>

            {/* Site Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center text-shadow">
                    Queer Youth Group
                </h1>
            </div>

            {/* Custom CSS for Swiper */}
            <style>
                {`
                    /* Hide navigation arrows */
                    .swiper-button-next,
                    .swiper-button-prev {
                        display: none !important;
                    }

                    /* Default pagination styling 
                    .swiper-pagination-bullet {
                        background-color: ${activeIndex === 0 ? '#FFFFFF' : '#D41367'} !important;
                        opacity: 0.6 !important;
                    } */

                    .swiper-pagination-bullet-active {
                        background-color: ${activeIndex === 0 ? '#D41367' : '#D41367'} !important;
                        opacity: 0.7 !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Slideshow;