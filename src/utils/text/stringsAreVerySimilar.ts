import { compareTwoStrings } from "string-similarity"
import stringIncludes from "./stringIncludes"

export default function stringAreVerySimilar(str1: string, str2: string) {
  return (
    stringIncludes(str1, str2) ||
    stringIncludes(str2, str1) ||
    compareTwoStrings(str1, str2) > 0.6
  )
}
