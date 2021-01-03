export const deleteCookie = (cookieName: string) => {
    // Just set the expires parameter to a passed date:
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}