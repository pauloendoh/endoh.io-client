import theme from "consts/theme";

export const mediaQueries = {
  isSmallerThan: (width: number) => `@media (max-width:${width}px)`,
  isResponsiveSm: `@media (max-width:${theme.breakpoints.values.sm}px)`,
  isResponsiveMd: `@media (max-width:${theme.breakpoints.values.md}px)`,
  isResponsiveLg: `@media (max-width:${theme.breakpoints.values.lg}px)`,

  isBiggerThan: (width: number) => `@media (min-width:${width}px)`,
  isBiggerThanSm: `@media (min-width:${theme.breakpoints.values.sm}px)`,
  isBiggerThanMd: `@media (min-width:${theme.breakpoints.values.md}px)`,
  isBiggerThanLg: `@media (min-width:${theme.breakpoints.values.lg}px)`,
};
