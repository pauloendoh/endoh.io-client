import { Theme, useMediaQuery } from "@mui/material"

export const useMyMediaQuery = () => {
  const downSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"))

  return {
    downSm,
  }
}
