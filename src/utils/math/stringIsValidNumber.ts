export const stringIsValidNumber = (str: string) => {
    if(!str) return false
    if(!Number(str)) return false
    return true
}