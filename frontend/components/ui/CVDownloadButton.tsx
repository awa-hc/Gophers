"use client";
import { SetStateAction, useState } from "react";

const CVDownloadButton = () => {
  const [language, setLanguage] = useState("en"); // Idioma por defecto

  const handleLanguageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLanguage(event.target.value);
  };

  const handleDownload = () => {
    const fileName = language === "en" ? "cv_en.pdf" : "cv_es.pdf";
    const link = document.createElement("a");
    link.href = `/pdf/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 rounded-lg shadow-md">
      <label
        className="text-lg font-semibold text-white"
        htmlFor="language-select"
      >
        
        Choose language:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-white text-black rounded-lg hover:scale-105 transition duration-300"
      >
        Download CV
      </button>
    </div>
  );
};

export default CVDownloadButton;
