import { createTheme } from "@mui/material/styles";

const commonSettings = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#64c7ef',
    },
    secondary: {
      main: '#b574c9',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#64c7ef',
      paper: '#fdfdfd',
    },
  },
  ...commonSettings,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#191919',
      paper: '#585858',
    },
    text: {
      primary: '#fbfbfb',
      secondary: 'rgba(255,255,255,0.8)',
      disabled: 'rgba(255,255,255,0.5)',
      hint: 'rgba(255,255,255,0.5)',
    },
    divider: 'rgba(255,255,255,0.11)',
  },
  components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(212,212,212,0.37)', // Default border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#inherit', // Change on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'inherit', // Change when focused
              },
            },
          },
        },
      },
  ...commonSettings,
});
  
export { lightTheme, darkTheme };