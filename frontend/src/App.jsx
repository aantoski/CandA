import { useState } from 'react';
import { Typography, Box, Button, TextField, CssBaseline, Paper } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from "./theme.jsx";
import Header from "./components/Header.jsx";
import axios from "axios";
import.meta.env.VITE_API_URL

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);  // State to hold the uploaded file
  const [responseMessage, setResponseMessage] = useState("");
  const [csvUrl, setCsvUrl] = useState("");
  const [graphUrl, setGraphUrl] = useState("");
  const theme = darkMode ? darkTheme : lightTheme;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);  // Store the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update state with response data (URLs and message)
      setResponseMessage(response.data.message);
      setCsvUrl(response.data.cleaned_csv_url);
      setGraphUrl(response.data.graph_url);
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponseMessage("An error occurred while uploading the file.");
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default", // Full page background color
          width: "100vw",  // Ensures no white space on left/right
          minHeight: "100vh", // Covers entire page height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0, // Ensure no extra padding
          margin: 0, // Prevent browser default margins
          flexDirection: "column",
        }}
      >
        <Header isDarkMode={darkMode} toggleTheme={() => setDarkMode((prev) => !prev)}/>
        <Paper
          elevation={6} // Adds shadow for separation
          sx={{
            bgcolor: "background.paper", // A different color for the container
            padding: 4,
            borderRadius: 2,
            textAlign: "center",
            width:"85%",
            height:"85%",
            margin: 2, // Prevent browser default margins
            // pt: 8 // Push content below the header
          
          }}
          >

      {/* Upload File Section */}
      <Box my={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          Upload CSV File
        </Typography>
        <Button variant="contained" component="label">
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpload}>
          Upload CSV
        </Button>
      </Box>
{/* Display Response Message */}
{responseMessage && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {responseMessage}
            </Typography>
          )}

          {/* Display Links for Cleaned CSV and Graph */}
          {csvUrl && (
            <div>
              <Typography variant="body1">Download Cleaned CSV:</Typography>
              <a href={`http://127.0.0.1:5000/${csvUrl}`} download>Click here</a>
            </div>
          )}

          {graphUrl && (
            <div>
              <Typography variant="body1">Generated Graph:</Typography>
              <img src={`http://127.0.0.1:5000/${graphUrl}`} alt="Graph" width="80%" height="80%"/>
            </div>
          )}

      {/* Form Section */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Data Cleaning Options
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Enter Task"
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="e.g., Remove duplicates, Handle missing values"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="outlined" color="secondary">
              Reset
            </Button>
          </Box>
        </form>
      </Box>  
            </Paper>
      </Box>
    </ThemeProvider>
  );
}
    
    

export default App;
