import { useQuery } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import { SimpleUserDto } from "./types/SimpleUserDto"

export function useNewUsersQuery() {
  const axios = useAxios()
  return useQuery([urls.api.newUsers], () =>
    axios.get<SimpleUserDto[]>(urls.api.newUsers).then((res) => res.data)
  )
}
