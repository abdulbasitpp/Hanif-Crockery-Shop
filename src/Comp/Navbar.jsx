import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Navbar({
  language,
  toggleLanguage,
  darkMode,
  toggleDarkMode,
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");
  const [show, setShow] = useState(true); // For sticky hide/show
  const location = useLocation();
  const prevScrollY = useRef(0);
  const menuRef = useRef(null);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Sticky hide/show on scroll
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current && currentScrollY > 50) {
        setShow(false); // scrolling down → hide
      } else {
        setShow(true); // scrolling up → show
      }
      prevScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: { en: "Home", ur: "ہوم" }, path: "/" },
    { name: { en: "Gallery", ur: "گیلری" }, path: "/gallery" },
    { name: { en: "About", ur: "ہمارے بارے میں" }, path: "/about" },
    { name: { en: "Contact", ur: "رابطہ" }, path: "/contact" },
  ];

  return (
    <nav
      className={`bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0 transform transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 truncate max-w-[70%]"
          >
            Hanif Crockery House
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs sm:text-sm dark:text-white"
            >
              {language === "en" ? "اردو" : "EN"}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
            >
              {darkMode ? <BsSun /> : <BsMoon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm lg:text-base transition ${
                  active === link.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
                }`}
              >
                {language === "en" ? link.name.en : link.name.ur}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col mt-16 space-y-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block text-base py-2 rounded transition ${
                active === link.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {language === "en" ? link.name.en : link.name.ur}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for click outside */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setOpen(false)}></div>
      )}
    </nav>
  );
}
