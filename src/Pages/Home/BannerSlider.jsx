import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import MagneticCursor from "../../Components/Buttons/MagneticCursor";

const bannerData = [
  {
    title: "Run for Glory",
    highlight: "Glory",
    description:
      "Join our premier marathons and challenge your limits on global tracks.",
    image:
      "https://i.postimg.cc/Y2gWpLRT/pexels-dmitrii-eremin-67499966-15741250.jpg",
  },
  {
    title: "Race. Connect. Conquer.",
    highlight: "Connect",
    description:
      "Meet runners worldwide and be part of an energetic fitness community.",
    image: "https://i.postimg.cc/NjG97Jtw/pexels-runffwpu-2654902.jpg",
  },
  {
    title: "Countdown to Victory",
    highlight: "Victory",
    description:
      "Track your journey, register for events, and witness your growth.",
    image: "https://i.postimg.cc/KYR1C14q/pexels-runffwpu-5735778.jpg",
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
        {bannerData.map(({ title, highlight, description, image }, index) => {
          const parts = title.split(highlight);

          return (
            <SwiperSlide key={index}>
              <div
                className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 px-4 text-center max-w-2xl text-white">
                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {parts[0]}
                    <span className="bg-yellow-400 text-black px-2 rounded mx-1">
                      {highlight}
                    </span>
                    {parts[1]}
                  </motion.h2>

                  <motion.p
                    className="text-lg sm:text-xl drop-shadow-md mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  >
                    {description}
                  </motion.p>

                  <MagneticCursor></MagneticCursor>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

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
