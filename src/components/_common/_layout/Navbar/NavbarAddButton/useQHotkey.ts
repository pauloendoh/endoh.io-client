import { useHotkeys } from "react-hotkeys-hook"
import { Location } from "react-router-dom"
import { DocDto } from "types/domain/questions/DocDto"
import { sleep } from "utils/sleep"

export const useQHotkey = (params: {
  location: Location<unknown>
  docs: DocDto[]
  callback: () => void
}) => {
  const { location, docs, callback } = params

  useHotkeys(
    "q",
    () => {
      sleep(100).then(callback)
    },
    [location, docs] // if you don't put 'docs', sometimes it will appear unselected
  )
}
