import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const TrendingCategories = () => {
  const categories = [
    {
      name: "iPhone",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-1_x100.png?v=1714565025",
      link: "/products",
    },
    {
      name: "Speaker",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-2_x100.png?v=1714565025",
      link: "/products",
    },
    {
      name: "Headphones",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-3_x100.png?v=1714565025",
      link: "/products",
    },
    {
      name: "Laptops",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-4_x100.png?v=1714565025",
      link: "/products",
    },
    {
      name: "AirPods",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-5_x100.png?v=1714565025",
      link: "/products",
    },
    {
      name: "Smart Watch",
      image: "//techno-workdo.myshopify.com/cdn/shop/files/category-6_x100.png?v=1714566664",
      link: "/products",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-white mb-2">Trending Categories</h2>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="category-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <a
              href={category.link}
              className="block bg-gray-800 rounded-lg p-6 text-center transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-white text-lg font-semibold">{category.name}</h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .category-swiper .swiper-button-next:after,
        .category-swiper .swiper-button-prev:after {
          font-size: 20px;
        }

        .category-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }

        .category-swiper .swiper-pagination-bullet-active {
          background: white;
        }

        .category-swiper .swiper-button-next:hover,
        .category-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TrendingCategories;
