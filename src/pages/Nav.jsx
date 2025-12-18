import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Nav = ({ darkMode, onToggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>

        {/* Toggle Theme Button */}
        <IconButton color="inherit" onClick={onToggleTheme}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
