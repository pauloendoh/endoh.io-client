import { Theme } from "@material-ui/core";
import "styled-components";

// segui o tutorial oficial para tipar as props, temas etc
// https://styled-components.com/docs/api#typescript
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
