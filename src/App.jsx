import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./pages/Home.jsx";
import Todo from "./pages/Todo.jsx";
import Nav from "./pages/Nav.jsx";
import Create from "./pages/Create.jsx";
import Update from "./pages/Update.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* pass props to Nav */}
        <Nav
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((prev) => !prev)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
