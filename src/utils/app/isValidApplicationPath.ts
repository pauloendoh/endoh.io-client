import PATHS from "../../consts/PATHS"
export const isValidApplicationPath = (pathname: string) => {
  return (
    pathname.startsWith(PATHS.monerate.index) ||
    pathname.startsWith(PATHS.relearn.index) || 
    pathname.startsWith(PATHS.skillbase.index) || 
    pathname.startsWith(PATHS.feed.index) || 
    pathname.startsWith(PATHS.define.index) 
  )
}
