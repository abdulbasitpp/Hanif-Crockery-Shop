import "./index.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Comp/Navbar";
import Footer from "./Comp/Footer"; 
import Home from "./Pages/home";
import Gallery from "./Pages/gallery";
import About from "./Pages/about";
import Contact from "./Pages/contact";
import { useState, useEffect } from "react";

function App() {
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'
  const [darkMode, setDarkMode] = useState(false);

  const toggleLanguage = () => setLanguage(language === "en" ? "ur" : "en");
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Add/remove dark class to html for Tailwind dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 dark:text-gray-200">
      {/* Navbar */}
      <Navbar
        language={language}
        toggleLanguage={toggleLanguage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main content */}
      <main dir={language === "ur" ? "rtl" : "ltr"} className="flex-1 pt-16">
        <Routes>
          <Route
            path="/"
            element={<Home language={language} darkMode={darkMode} />}
          />
          <Route
            path="/gallery"
            element={<Gallery language={language} darkMode={darkMode} />}
          />
          <Route
            path="/about"
            element={<About language={language} darkMode={darkMode} />}
          />
          <Route
            path="/contact"
            element={<Contact language={language} darkMode={darkMode} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        language={language}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

export default App;
