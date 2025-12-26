import { motion } from "framer-motion";
import { BsMoon, BsSun } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer({ language, darkMode, toggleDarkMode }) {
  const isUrdu = language === "ur";

  const navLinks = [
    { name: { en: "Home", ur: "ہوم" }, path: "/" },
    { name: { en: "Gallery", ur: "گیلری" }, path: "/gallery" },
    { name: { en: "About", ur: "ہمارے بارے میں" }, path: "/about" },
    { name: { en: "Contact", ur: "رابطہ" }, path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/923001234567",
      label: "WhatsApp",
    },
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 pt-12 pb-8 px-4 sm:px-6 lg:px-20`}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding + About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700">
            Hanif Crockery House
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {isUrdu
              ? "حنیف کراکری اسٹور آپ کے گھر تک اعلیٰ معیار کے ڈنر سیٹس اور جدید کچن ضروریات پہنچاتا ہے۔"
              : "Hanif Crockery Store delivers high-quality dinner sets and modern kitchen essentials to your home."}
          </p>
          <div className="flex items-center gap-4 mt-2">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-green-500 hover:text-white transition"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-2">
            {isUrdu ? "فوری روابط" : "Quick Links"}
          </h3>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <motion.div key={link.path} whileHover={{ scale: 1.05 }}>
                <Link
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition font-medium"
                >
                  {isUrdu ? link.name.ur : link.name.en}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-2">
            {isUrdu ? "رابطہ کریں" : "Contact Info"}
          </h3>
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FiPhone className="text-green-500" />
              <span dir="ltr">0311 7351680</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-blue-500" />
              <span dir="ltr">0313 0879932</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />{" "}
              <a
                href="https://wa.me/923001234567"
                className="underline hover:text-green-500"
                dir="ltr"
              >
                {isUrdu ? "چیٹ کریں" : "Chat Now"}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-red-500" />{" "}
              <span>
                {isUrdu
                  ? "نذیر خان مارکیٹ، دکان نمبر 5، زیارت روڈ، پبی"
                  : "Nazeer Khan Market, Shop #5, Ziarat Road, Pabbi"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-blue-400" />
              <span dir="ltr">info@hanifcrockery.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-1">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Abdul Basit</span> — CS Graduate &
          Full Stack Developer.{" "}
          {isUrdu ? "تمام حقوق محفوظ ہیں۔" : "All rights reserved."}
          <br />
          {isUrdu ? "پورٹ فولیو دیکھیں:" : "Developer Contact:"}{" "}
          <a
            href="https://portfolio-m-basit.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500
             dark:hover:text-blue-300 transition-colors"
          >
            Portfolio-Abdul-Basit.Vercel.App
          </a>
        </p>

        <button
          onClick={toggleDarkMode}
          className="mt-2 md:mt-0 p-2 rounded 
          hover:bg-gray-200 dark:hover:bg-gray-700
           text-gray-700 dark:text-gray-200 transition"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
      </div>
    </footer>
  );
}
