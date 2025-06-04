import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiCrosshair } from "react-icons/fi";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  const GEO_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${GEO_API_KEY}`
      );
      setSuggestions(data.map((loc) => `${loc.name}, ${loc.country}`));
    } catch (err) {
      console.error("Error fetching suggestions", err);
      setSuggestions([]);
    }
  };

  const handleSearch = (value) => {
    if (!value.trim()) return;
    onSearch(value);
    const updated = [value, ...recent.filter((c) => c !== value)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setInput("");
    setSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    const items = [...suggestions, ...recent.filter((r) => !suggestions.includes(r))];
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      const value = selectedIndex >= 0 ? items[selectedIndex] : input;
      handleSearch(value);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (input.trim()) fetchSuggestions(input.trim());
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!inputRef.current?.contains(e.target)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const combined = [...suggestions, ...recent.filter((r) => !suggestions.includes(r))];

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
        <FiSearch className="text-gray-500 text-xl mr-2" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search for places ..."
          className="outline-none bg-transparent text-gray-800 placeholder-gray-400 w-full"
        />
        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
          <FiCrosshair className="text-gray-600" />
        </button>
      </div>

      {showDropdown && combined.length > 0 && (
        <ul className="absolute z-20 bg-white mt-2 w-full rounded-xl shadow-lg overflow-hidden">
          {combined.map((item, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                selectedIndex === idx ? "bg-blue-100 font-semibold" : ""
              }`}
              onMouseDown={() => handleSearch(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
