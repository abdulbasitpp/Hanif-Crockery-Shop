import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About({ language, darkMode }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/Family.jpg", title: { en: "Owners", ur: "مالکان" } },
    { src: "/Arshad.jpg", title: { en: "Arshad Ali", ur: "ارشد علی" } },
    { src: "/Shahid (2).jpg", title: { en: "Shahid Ali", ur: "شاہد علی  " } },
  ];

  /* 🔒 Scroll lock + ESC close */
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
    const esc = (e) => e.key === "Escape" && setSelectedImage(null);
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", esc);
    };
  }, [selectedImage]);

  /* Animations */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  };

  return (
    <section
      className={`py-16 px-4 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl md:text-4xl font-extrabold text-center mb-6"
        >
          {language === "en" ? "About Us" : "ہمارے بارے میں"}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className={`text-lg md:text-xl text-center max-w-5xl mx-auto mb-14 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {language === "en"
            ? "Trusted crockery for every home. Premium quality, simple choice, beautiful designs."
            : "ہر گھر کے لیے قابلِ اعتماد کراکری۔ اعلیٰ معیار، سادہ انتخاب، خوبصورت ڈیزائن۔"}
        </motion.p>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-14">
          {[
            { num: "12+", label: language === "en" ? "Years" : "سال" },
            { num: "2K+", label: language === "en" ? "Customers" : "گاہک" },
            { num: "100%" , label: language === "en" ? "Trusted" : "اعتماد" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-xl py-6 shadow"
            >
              <p className="text-3xl font-extrabold">{s.num}</p>
              <p className="text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedImage(img.src)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl group"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.title.en}
                className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Always-visible label (important for illiterate users) */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white text-xl font-bold py-3 rounded-xl text-center">
                {language === "en" ? img.title.en : img.title.ur}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              className="max-h-[90vh] w-full object-contain rounded-2xl"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 120 }}
            />

            {/* Close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-4xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
