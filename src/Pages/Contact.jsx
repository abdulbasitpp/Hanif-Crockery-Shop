import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";

export default function Contact({ language, darkMode }) {
  const [showCard, setShowCard] = useState(true);
  const isUrdu = language === "ur";

  /* PARALLAX */
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* CARD ANIMATION */
  const cardVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18, type: "spring", stiffness: 120 },
    }),
    hover: {
      scale: 1.06,
      y: -6,
      transition: { type: "spring", stiffness: 150 },
    },
  };

  return (
    <section
      dir={isUrdu ? "rtl" : "ltr"}
      className={`relative px-4 sm:px-6 lg:px-20 py-16 max-w-7xl mx-auto
      ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}
      transition-colors`}
    >
      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center
        text-green-700 dark:text-green-400 mb-10"
      >
        {isUrdu ? "رابطہ برائے معلومات" : "Contact Information"}
      </motion.h1>

      {/* TRUST STATS (ILLITERATE FRIENDLY) */}
      <motion.div
        className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {[
          { num: "12+", label: isUrdu ? "سال تجربہ" : "Years Experience" },
          { num: "2K+", label: isUrdu ? "خوش گاہک" : "Happy Customers" },
          { num: "100%", label: isUrdu ? "اعتماد" : "Trust" },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl bg-green-600 text-white py-4 shadow-xl"
          >
            <p className="text-2xl sm:text-3xl font-extrabold">{s.num}</p>
            <p className="text-sm sm:text-base font-bold">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-center">
  {[
    {
      icon: <FiPhone className="text-green-500 text-3xl" />,
      label: isUrdu ? "فون" : "Phone",
      value: (
        <span
          dir="ltr"
          className="font-bold tracking-wider inline-block"
          style={{ unicodeBidi: "isolate" }}
        >
          0311 7351680
        </span>
      ),
      name: isUrdu ? "ارشد علی" : "Arshad Ali",
    },
    {
      icon: <FiPhone className="text-blue-500 text-3xl" />,
      label: isUrdu ? "فون" : "Phone",
      value: (
        <span
          dir="ltr"
          className="font-bold tracking-wider inline-block"
          style={{ unicodeBidi: "isolate" }}
        >
          0313 0879932
        </span>
      ),
      name: isUrdu ? "شاہد علی" : "Shahid Ali",
    },
    {
      icon: <FaWhatsapp className="text-green-400 text-3xl" />,
      label: isUrdu ? "واٹس ایپ" : "WhatsApp",
      value: (
        <a
          href="https://wa.me/+923117351680"
          className="underline font-bold"
          dir="ltr"
          style={{ unicodeBidi: "isolate" }}
        >
          {isUrdu ? "چیٹ کریں" : "Chat Now"} ✅
        </a>
      ),
    },
    {
      icon: <FiMapPin className="text-red-500 text-3xl" />,
      label: isUrdu ? "پتہ" : "Address",
      value: isUrdu
        ? "نذیر خان مارکیٹ، دکان نمبر 5، زیارت روڈ، پبی"
        : "Nazeer Khan Market, Shop #5, Ziarat Road, Pabbi",
    },
  ].map((item, i) => (
    <motion.div
      key={i}
      custom={i}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl"
    >
      {item.icon}
      <p className="mt-3 text-lg sm:text-xl font-extrabold">
        {item.label}
      </p>
      <p className="font-bold">{item.value}</p>
      {item.name && <p className="opacity-80">{item.name}</p>}
    </motion.div>
  ))}
</div>


      {/* MAP */}
      <motion.div
        className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl mb-16"
        style={{ y: scrollY * 0.05 }}
        onClick={() => setShowCard(false)}
      >
        <iframe
          src="https://www.google.com/maps?q=34.0081120,71.800918&z=16&output=embed"
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />

        {/* FLOATING LOCATION CARD */}
        {showCard && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2
            bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
            rounded-2xl px-6 py-4 shadow-xl"
          >
            <p className="font-bold flex items-center gap-2">
              <FiMapPin className="text-red-500" />
              {isUrdu ? "دکان کا مقام" : "Shop Location"}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* VISUAL CARD IMAGE (IMPORTANT) */}
      <motion.img
        src="/card.jpg"
        alt="Shop Card"
        className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
      />
    </section>
  );
}
