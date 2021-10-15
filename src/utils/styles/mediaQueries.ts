import theme from "consts/theme";

export const mediaQueries = {
  isResponsiveSm: `@media (max-width:${theme.breakpoints.values.sm}px)`,
  isBiggerThanSm: `@media (min-width:${theme.breakpoints.values.sm}px)`,
};
