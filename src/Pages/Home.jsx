import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ language, darkMode }) {
  const [selectedImage, setSelectedImage] = useState(null);

const images = [
  "/Shope-pic1.jpg",
  "/Shope-pic2.jpg",
  "/Shope-pic3.jpg",
  "/Shope-pic4.jpg",
  "/Shope-pic5.jpg",
  "/Shope-pic6.jpg",
  "/Shope-pic7.jpg",
  "/Shope-pic8.jpg",
  "/Shope-pic9.jpg",
  
];


  // 🔒 LOCK / UNLOCK SCROLL
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

  // Animation Variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const gridVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  const modalVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120 },
    },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.3 } },
  };

  return (
    <div
      dir={language === "ur" ? "rtl" : "ltr"}
      className={`p-6 flex flex-col items-center space-y-14 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HERO SECTION */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className={`rounded-3xl shadow-2xl p-10 text-center max-w-6xl w-full ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          {language === "en"
            ? "Hanif Crockery Store"
            : "حنیف کراکری اسٹور"}
        </h1>

        {/* CLARITY LINE */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600 mb-4">
          {language === "en"
            ? "Dinner Sets • Cups & Mugs • Kitchen Essentials"
            : "ڈنر سیٹس • کپ • کچن کا سامان"}
        </p>

        {/* TRUST LINE */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
          {language === "en"
            ? "Serving quality crockery to families in Pabbi with trust, durability, and elegant designs."
            : "پبی میں معیاری، پائیدار اور خوبصورت کراکری کی قابلِ اعتماد خدمت۔"}
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-bold bg-green-600 text-white shadow-lg"
            >
              {language === "en" ? "Explore Products" : "مصنوعات دیکھیں"}
            </motion.button>
          </Link>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-bold border-2 border-green-600 text-green-600"
            >
              {language === "en" ? "Visit Store" : "دکان کا پتہ"}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* VIDEO SECTION */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative w-full max-w-6xl h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl"
      >
        <video
          src="/Shope.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {images.map((img, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={gridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            onClick={() => setSelectedImage(img)}
            className={`cursor-pointer overflow-hidden rounded-2xl shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={img}
              alt="Product"
              className="w-full h-[320px] object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          >
            <motion.div className="relative max-w-6xl w-full">
              <img
                src={selectedImage}
                alt="Full View"
                className="w-full max-h-[90vh] object-contain rounded-xl"
              />

              <motion.button
                className="absolute -top-12 right-0 text-white text-4xl font-bold"
                whileHover={{ scale: 1.3, rotate: 5 }}
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
