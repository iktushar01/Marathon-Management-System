import Lottie from "lottie-react";
import marathonAnimation from "../../assets/faq.json";
import { motion } from "framer-motion";

const MARATHON_FAQS = [
  {
    question: "How do I register for a marathon?",
    answer: "Navigate to the Marathons page, select your desired event, and click 'Register'. Fill out the form with your details to complete registration."
  },
  {
    question: "What are the registration deadlines?",
    answer: "Each marathon has specific registration dates listed on its details page. Registration closes at 11:59 PM on the end date."
  },
  {
    question: "Can I update my registration information?",
    answer: "Yes, you can update your details until registration closes. Visit 'My Apply List' in your dashboard to make changes."
  },
  {
    question: "What distances are available?",
    answer: "We offer 3K, 10K, and 25K distances. Choose what suits your fitness level during registration."
  },
  {
    question: "How do I track my registration status?",
    answer: "All your registered marathons appear in 'My Apply List' in your dashboard with current status and countdown to event day."
  },
  {
    question: "What safety measures are in place?",
    answer: "All events have medical stations, hydration points, and route marshals. Emergency contacts are provided in your confirmation email."
  }
];

const MarathonFAQs = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-yellow-400 mb-4">
          MARATHON FAQS
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Answers to common questions about registration, participation, and event details.
        </p>
      </motion.header>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 ">
          <Lottie 
            animationData={marathonAnimation} 
            loop={true}
            aria-hidden="true"
          />
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full lg:w-1/2 space-y-4">
          {MARATHON_FAQS.map((item, index) => (
            <div 
              key={index}
              className="collapse collapse-plus bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            >
              <input 
                type="radio" 
                name="marathon-faq-accordion" 
                id={`marathon-faq-${index}`}
                defaultChecked={index === 0}
                className="peer"
              />
              <label 
                htmlFor={`marathon-faq-${index}`}
                className="collapse-title font-semibold text-gray-900 dark:text-white cursor-pointer flex items-center"
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`marathon-faq-content-${index}`}
              >
                {item.question}
              </label>
              <div 
                id={`marathon-faq-content-${index}`}
                className="collapse-content text-gray-700 dark:text-gray-300"
              >
                <p className="pt-2 pb-4 px-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarathonFAQs;