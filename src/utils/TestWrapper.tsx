import {
  CssBaseline,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material"
import Snackbars from "components/_UI/SnackBars/Snackbars"
import { QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "store/store"
import { myQueryClient } from "./consts/myQueryClient"
import theme from "./consts/theme"

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const TestWrapper: React.FC = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={myQueryClient}>
              <CssBaseline />

              {props.children}

              <Snackbars />
            </QueryClientProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default TestWrapper
