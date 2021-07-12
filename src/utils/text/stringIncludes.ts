// string.includes with upperCase() and trim()

const stringIncludes = (text1: string, text2: string): boolean => {
  return text1.toUpperCase().trim().includes(text2.toUpperCase().trim())
}

export default stringIncludes
