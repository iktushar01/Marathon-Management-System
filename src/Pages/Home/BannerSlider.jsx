import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

const bannerData = [
  {
    title: "Run for Glory",
    description: "Join our premier marathons and challenge your limits on global tracks.",
    image: "https://i.postimg.cc/Y90Z73MK/0f7588e2d987da38d0b88afc8f4ce798-Copy.jpg",
  },
  {
    title: "Race. Connect. Conquer.",
    description: "Meet runners worldwide and be part of an energetic fitness community.",
    image: "https://i.postimg.cc/5yFrY2Xs/2005-BMW-M3-GTR-Need-For-Speed-001-1080.jpg",
  },
  {
    title: "Countdown to Victory",
    description: "Track your journey, register for events, and witness your growth.",
    image: "https://i.postimg.cc/Px7c5w5L/2023-Porsche-911-GT3-R-Rennsport-004-1080-Copy.jpg",
  },
];

export default function BannerSlider() {
  return (
    <div className="min-h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-screen grab-slider"
      >
        {bannerData.map(({ title, description, image }, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>

              <div className="relative z-10 px-4 text-center max-w-2xl text-white">
                
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {title}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #facc15 !important;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #facc15 !important;
          opacity: 1;
        }
        .grab-slider {
          cursor: grab;
        }
        .grab-slider:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
