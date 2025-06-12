import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sponsors = [
  {
    name: "Nike",
    logo: "https://i.postimg.cc/5yYGTLXc/pngimg-com-nike-PNG11.png",
    url: "https://www.nike.com",
  },
  {
    name: "Adidas",
    logo: "https://i.postimg.cc/ZnjJq2th/puma.png",
    url: "https://www.adidas.com",
  },
  {
    name: "Puma",
    logo: "https://i.postimg.cc/FRKwb2mH/pngegg-2.png",
    url: "https://www.puma.com",
  },
  {
    name: "New Balance",
    logo: "https://i.postimg.cc/cL0WgkKr/pngegg-1.png",
    url: "https://www.newbalance.com",
  },
  {
    name: "Under Armour",
    logo: "https://i.postimg.cc/W3fC5Xb6/pngegg-3.png",
    url: "https://www.underarmour.com",
  },
  {
    name: "Asics",
    logo: "https://i.postimg.cc/rpMBsDPW/pngegg-4.png",
    url: "https://www.asics.com",
  },
  {
    name: "Reebok",
    logo: "https://i.postimg.cc/x1vr9vtn/pngegg-5.png",
    url: "https://www.reebok.com",
  },
  {
    name: "Jordan",
    logo: "https://i.postimg.cc/8C4q6T2Y/pngegg-6.png",
    url: "https://www.nike.com/jordan",
  },
];

const SponsorMarquee = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const controls = useAnimation();
  const [duration, setDuration] = useState(40); // desktop default
  const [reverseDuration, setReverseDuration] = useState(45); // desktop default

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDuration(10); // mobile speed
        setReverseDuration(20);
      } else {
        setDuration(40); // desktop speed
        setReverseDuration(45);
      }
    };

    handleResize(); // set on initial load
    window.addEventListener("resize", handleResize); // update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    controls.start("animate");
  }, [controls, inView]);

  const doubledSponsors = [...sponsors, ...sponsors];

  return (
    <div>
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
          OFFICIAL SPONSORS
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Trusted brands supporting your race day experience.
        </p>
      </motion.div>

      {/* Marquee Section */}
      <div ref={ref} className="bg-cyan-950">
        <div className="container relative overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 py-4 md-py-16">

          {/* Marquee - First Row */}
          <motion.div
            className="flex mb-8"
            animate={controls}
            variants={{
              initial: { x: 0 },
              animate: {
                x: ["0%", "-100%"],
                transition: {
                  x: {
                    repeat: Infinity,
                    duration: duration,
                    ease: "linear",
                  },
                },
              },
            }}
          >
            {doubledSponsors.map((sponsor, index) => (
              <motion.a
                key={`${sponsor.name}-${index}-1`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8 h-20 flex items-center"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-32 object-contain transition-all"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Marquee - Second Row (Reverse Direction) */}
          <motion.div
            className="md:flex hidden"
            animate={controls}
            variants={{
              initial: { x: 0 },
              animate: {
                x: ["-100%", "0%"],
                transition: {
                  x: {
                    repeat: Infinity,
                    duration: reverseDuration,
                    ease: "linear",
                  },
                },
              },
            }}
          >
            {[...doubledSponsors].reverse().map((sponsor, index) => (
              <motion.a
                key={`${sponsor.name}-${index}-2`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8 h-16 flex items-center"
                whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
              >
                <motion.img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-32 object-contain transition-all opacity-80"
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SponsorMarquee;
