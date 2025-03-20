import { useMemo } from "react"
import { useLocation } from "react-router-dom"

// PE 1/3 - stop using this. Use useSearchParams instead
export default function useMyQueryParams() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}
