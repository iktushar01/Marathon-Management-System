import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import MagneticCursor from "../../Components/Buttons/MagneticCursor";

const bannerData = [
  {
    title: "Run for Glory",
    highlight: "Glory",
    description:
      "Join our premier marathons and challenge your limits on global tracks.",
    image:
      "https://i.postimg.cc/cHyg7bF3/pexels-runffwpu-2402735.jpg",
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

const HighlightText = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.8, ease: "easeInOut" }
      });
      await controls.start({
        backgroundColor: "#facc15",
        color: "#000",
        transition: { duration: 0.3 }
      });
    };
    sequence();
  }, [controls]);

  return (
    <motion.span
      className="inline-block px-2 rounded mx-1"
      initial={{ backgroundColor: "#00000000", color: "#facc15" }}
      animate={controls}
      whileHover={{
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.span>
  );
};

export default function BannerSlider() {
  return (
    <div className="min-h-screen w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={1000}
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

                <div className="relative z-10 px-4 text-center max-w-2xl mx-auto text-white">
                  <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {parts[0]}
                    <HighlightText>{highlight}</HighlightText>
                    {parts[1]}
                  </motion.h2>

                  <motion.p
                    className="text-lg sm:text-xl drop-shadow-md mb-8 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.3 
                    }}
                  >
                    {description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <MagneticCursor />
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 30px !important;
        }
        .swiper-pagination-bullet {
          background: #facc15 !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 30px;
          border-radius: 4px;
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