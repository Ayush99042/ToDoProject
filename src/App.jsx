import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

import Home from "./pages/Home.jsx";
import Nav from "./pages/Nav.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Fetch theme from API on mount
  useEffect(() => {
    axios.get("http://192.168.1.35:4000/api/settings")
      .then((res) => {
        // Assume API returns { theme: "dark" } or { theme: "light" }
        setDarkMode(res.data.theme === "dark");
      })
      .catch((err) => console.error("Error fetching theme:", err))
  }, []);

  // Update theme dynamically
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // Toggle theme locally AND optionally call API to save preference
  const handleToggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    console.log(newMode)
    axios.put("http://192.168.1.35:4000/api/settings", { theme: newMode ? "dark" : "light" })
      .catch((err) => console.error("Error saving theme:", err));
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav darkMode={darkMode} onToggleTheme={handleToggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
