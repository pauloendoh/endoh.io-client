import {
  CssBaseline,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material"
import { QueryClientProvider } from "@tanstack/react-query"
import Snackbars from "components/_UI/SnackBars/Snackbars"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "store/store"
import { myQueryClient } from "./consts/myQueryClient"
import theme from "./consts/theme"

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type Props = {
  children: React.ReactNode
}

const TestWrapper = (props: Props) => {
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
