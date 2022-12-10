import { useTheme } from "@mui/material"

export const useGetColorByRating = (rating: number) => {
  const theme = useTheme()

  switch (rating) {
    case 1:
      return "#929292"
    case 2:
      return "#968864"
    case 3:
      return "#aa8833"
    case 4:
      return "#d1a024"
    case 5:
      return "#FFB600"
    default:
      return theme.palette.grey[300]
  }
}
