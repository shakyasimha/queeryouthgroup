"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { alegreyaSans, notoSansDevanagari } from "@/ui/fonts";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Publication {
  id: number;
  title: string;
  description: string;
  year: number;
  imagePath: string;
  imageAlt: string;
  isNepali: boolean;
}

export default function PublicationsCarousel() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  
  // Always call useTranslations at the top level
  const t = useTranslations('HomepageReport');
  
  // Get title with fallback handling
  const getTitle = () => {
    try {
      return t('title');
    } catch {
      console.warn('Translation not found for HomepageReport, using fallback');
      return "Publications"; // Fallback title
    }
  };

  const title = getTitle();

  useEffect(() => {
    const publicationsData: Publication[] = [
      {
        id: 1,
        title: "गृह मन्त्रालयको अन्यलिङ्गी निर्देशिका",
        description: "Ministry directive analysis on gender rights",
        year: 2021,
        imagePath: "/images/publication/Anyalingi_Ecopy cover.jpg",
        imageAlt: "Gender Directive Analysis",
        isNepali: true
      },
      {
        id: 2,
        title: "यौन अभिमुखीकरण र लैङ्गिक पहिचान",
        description: "Basic concepts of gender and sexuality",
        year: 2021,
        imagePath: "/images/publication/Basic_SOGIESC_Nepali cover.jpg",
        imageAlt: "SOGIESC Concepts",
        isNepali: true
      },
      {
        id: 3,
        title: "लैङ्गिक पहिचानको अधिकार",
        description: "2020 gender identity demands compilation",
        year: 2020,
        imagePath: "/images/publication/DemandSheetBook_Ecopy cover.jpg",
        imageAlt: "Gender Rights Demands",
        isNepali: true
      },
      {
        id: 4,
        title: "लैङ्गिक पहिचान विधेयक",
        description: "Civil society legislative proposal",
        year: 2021,
        imagePath: "/images/publication/लैप_विधेयक_पुस्तक cover.jpg",
        imageAlt: "Gender Identity Bill",
        isNepali: true
      }
    ];

    setTimeout(() => {
      setPublications(publicationsData);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading || publications.length === 0) {
    return null;
  }

  return (
    <div className="w-full mx-auto max-w-[94vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl">
      {/* Title Section - Above the box */}
      <h2 className={`${alegreyaSans.className} text-xl font-bold text-center mb-6 text-black sm:text-2xl md:text-3xl`}>
        {title}
      </h2>

      {/* Carousel Box */}
      <div className="bg-[#f8e6ed] rounded-lg px-4 py-5 relative">
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              400: { slidesPerView: 1.2 },
              500: { slidesPerView: 1.3 },
              640: { slidesPerView: 1.8, spaceBetween: 18 },
              768: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 22 },
              1280: { slidesPerView: 3, spaceBetween: 24 }
            }}
            loop={publications.length > 3}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true 
            }}
            navigation={{
              nextEl: ".publications-next",
              prevEl: ".publications-prev",
            }}
            pagination={{
              clickable: true,
              el: ".publications-pagination",
            }}
            className="publications-swiper"
          >
            {publications.map((publication) => (
              <SwiperSlide key={publication.id}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-[360px] sm:h-[380px] md:h-[400px] flex flex-col">
                  {/* Image Container */}
                  <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] bg-[#f0f0f0]">
                    {!imageError[publication.id] ? (
                      <Image
                        src={publication.imagePath}
                        alt={publication.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
                        onError={() => setImageError(prev => ({...prev, [publication.id]: true}))}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span className="text-4xl">📄</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    {/* Title with appropriate font */}
                    <h3 className={`${publication.isNepali ? notoSansDevanagari.className : alegreyaSans.className} text-base font-bold text-black mb-3 line-clamp-2 leading-snug sm:text-lg`}>
                      {publication.title}
                    </h3>

                    {/* Description with appropriate font */}
                    <p className={`${alegreyaSans.className} text-sm text-gray-600 mb-4 flex-grow line-clamp-3 leading-relaxed sm:text-base`}>
                      {publication.description}
                    </p>

                    <div className={`${alegreyaSans.className} flex items-center justify-between`}>
                      <span className="text-[#d41367] font-semibold text-base sm:text-lg">
                        {publication.year}
                      </span>
                      <button 
                        className="text-[#d41367] hover:text-[#a0105a] font-medium text-sm transition-colors duration-200 hover:underline sm:text-base"
                        onClick={() => console.log(`View publication: ${publication.title}`)}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="publications-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#d41367] hover:bg-[#d41367] hover:text-white transition-all duration-300 md:-left-5 md:w-10 md:h-10">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button className="publications-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#d41367] hover:bg-[#d41367] hover:text-white transition-all duration-300 md:-right-5 md:w-10 md:h-10">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="publications-pagination flex justify-center mt-5"></div>
        </div>
      </div>
    </div>
  );
}