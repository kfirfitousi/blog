"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function DarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const html = document.querySelector("html");
    if (html) {
      html.classList.toggle("dark");
      setIsDarkMode((prevValue) => !prevValue);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-auto text-slate-700 hover:text-slate-500 dark:text-slate-200 dark:hover:text-slate-400"
    >
      {isDarkMode ? <Sun /> : <Moon />}
      <label className="sr-only">Toggle dark mode</label>
    </button>
  );
}
