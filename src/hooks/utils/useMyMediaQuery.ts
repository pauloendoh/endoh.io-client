import { Theme, useMediaQuery } from "@mui/material"

export const useMyMediaQuery = () => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"))
  const downSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"))
  const downMd = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"))
  const downLg = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"))

  return {
    isMobile,
    downSm,
    downMd,
    downLg,
  }
}
