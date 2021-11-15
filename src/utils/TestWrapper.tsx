import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import Snackbars from "components/_UI/SnackBars/Snackbars";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store/store";
import { ThemeProvider } from "styled-components";
import { myQueryClient } from "./consts/myQueryClient";
import theme from "./consts/theme";

const TestWrapper: React.FC = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={myQueryClient}>
              <CssBaseline />

              {props.children}

              <Snackbars />
            </QueryClientProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default TestWrapper;
