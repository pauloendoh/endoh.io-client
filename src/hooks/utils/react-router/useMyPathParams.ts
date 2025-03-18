import { useParams } from "react-router-dom"

export function useMyPathParams() {
  const params = useParams<{
    tagId: string
  }>()

  return params
}
