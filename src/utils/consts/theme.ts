import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#1E1E1E",
    },
    primary: { main: "#3DAC8D", contrastText: "#fff" },
    secondary: { main: "#C862AC" },
  },
  typography: {
    // fontFamily: `'Open Sans', sans-serif;`, // imported at index.css
    // fontFamily: `'Saira', sans-serif;`, // imported at index.css
    fontFamily: `'Noto Sans', sans-serif;`, // imported at index.css

    fontSize: 12,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "72px !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#1E1E1E",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: "#1E1E1E",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#2b2b2b",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        arrow: { color: "#292929" },
        tooltip: {
          backgroundColor: "#292929",
          fontSize: 12,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#292929",
        },
      },
    },
  },

  zIndex: {
    appBar: 1201, // zIndex.drawer + 1
  },
})

export default theme
