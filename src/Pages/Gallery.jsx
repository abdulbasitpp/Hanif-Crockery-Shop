import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ language, darkMode }) {
  const [selectedImage, setSelectedImage] = useState(null);

  /* 🔒 LOCK / UNLOCK SCROLL */
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";

    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [selectedImage]);

  /* DATA */
  const GalleryData = [
    {
      title: { en: "Dinner Sets", ur: "ڈنر سیٹس" },
      images: [
        "/Dinner set1.jpg",
        "/Dinner set2.jpg",
        "/Dinner set3.jpg",
        "/Dinner set4.jpg",
        "/Dinner set5.jpg",
        "/Dinner set6.jpg",
      ],
    },
    {
      title: { en: "Cups & Mugs", ur: "کپ اور مگ" },
      images: [
        "/cups1.jpg",
        "/cups2.jpg",
        "/cups3.jpg",
        "/cups4.jpg",
        "/cups5.jpg",
        "/cups6.jpg",
      ],
    },
    {
      title: { en: "Plates & Bowls", ur: "پلیٹس اور پیالے" },
      images: [
        "/plate1.jpeg",
        "/plate2.jpeg",
        "/plate3.jpeg",
        "/plate4.jpeg",
        "/plate5.jpeg",
        "/plate6.jpeg",
      ],
    },
    {
      title: { en: "Kitchen Tools", ur: "کچن کے اوزار" },
      images: [
        "/tools1.webp",
        "/tools2.webp",
        "/tools4.jpg",
        "/tools5.jpg",
        "/tools6.jpg",
        "/tools7.jpg",
      ],
    },
  ];

  /* MOTION VARIANTS */
  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.9,
        ease: "easeOut",
      },
    }),
  };

  const modalVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 140 },
    },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.25 } },
  };

  return (
    <section
      dir={language === "ur" ? "rtl" : "ltr"}
      className={`relative py-16 px-4 sm:px-6 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* PAGE TITLE */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {language === "en" ? "Our Gallery" : "ہماری کیٹیگریز"}
        </motion.h1>

        {/* GALLERY SECTIONS */}
        {GalleryData.map((category, index) => (
          <section key={index} className="space-y-8">
            {/* CATEGORY TITLE */}
            <motion.h2
              className={`inline-block px-6 py-3 rounded-2xl text-2xl font-extrabold
              backdrop-blur-md shadow-xl
              ${
                darkMode
                  ? "bg-white/10 text-gray-100"
                  : "bg-white/70 text-gray-900"
              }`}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {language === "en" ? category.title.en : category.title.ur}
            </motion.h2>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.images.map((img, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={imageVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{
                    scale: 1.07,
                    rotateX: 3,
                    rotateY: -3,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  className={`relative cursor-pointer overflow-hidden rounded-3xl
                  shadow-2xl group
                  ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  {/* IMAGE */}
                  <img
                    src={img}
                    alt={language === "en" ? category.title.en : category.title.ur}
                    className="w-full h-[260px] sm:h-[300px] object-cover"
                  />

                  {/* OVERLAY (ILLITERATE FRIENDLY) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

                  <div className="absolute bottom-4 left-4 right-4
                  bg-black/60 text-white text-center
                  rounded-xl py-2 opacity-0 group-hover:opacity-100 transition">
                    {language === "en" ? category.title.en : category.title.ur}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="relative max-w-6xl w-full">
              <img
                src={selectedImage}
                alt="Full View"
                className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />

              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white text-4xl font-bold"
                whileHover={{ scale: 1.3, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
