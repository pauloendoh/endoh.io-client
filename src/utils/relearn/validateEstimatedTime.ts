
export const validateEstimatedTime = (estimatedTime: string) => {
    if (
        // invalid estimated times
        estimatedTime === "  :  h" ||
        estimatedTime === "00:00h" ||
        estimatedTime === ""
    ) {
        return false
    }
    return true
}