import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Nav = ({ darkMode, onToggleTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/todo">
          Todo
        </Button>

        {/* Toggle Theme Button */}
        <IconButton color="inherit" onClick={onToggleTheme}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />  }
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
