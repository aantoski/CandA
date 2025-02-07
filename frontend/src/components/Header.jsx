// import React from "react";
import PropTypes from 'prop-types';
import { Typography, Box, Container, IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ isDarkMode, toggleTheme }) => {
  return (
    <Box 
      sx={{
        // bgcolor: "primary.main", // Matches theme
        bgcolor: "transparent", 
        textAlign: "center",
        // flexDirection: "row",
        pb: 0,
        margin: "none",
        position: "relative",
      }}
    >
      {/* <Container maxWidth="md"> Centers content */}
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: "flex", 
            textAlign: "center", 
            justifyContent: "normal", // ✅ Pushes text left & button right
            flex: 1,
            // position: "relative",  // Keep the button positioned relative to this container
          }}
        >
          {/* Title & Subtitle on the Left */}
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              CandA
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              First pass tool for data cleaning and analysis
            </Typography>
          </Box>

          <IconButton onClick={toggleTheme} color="secondary.main" size="large" sx={{
              position: "absolute",  // Position the button at the far right
              right: 16,  // Space from the right edge
              top:4,
            }}>
            {isDarkMode ? <LightModeIcon fontSize="40px" /> : <DarkModeIcon fontSize="40px" />}
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

Header.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    };

export default Header;
