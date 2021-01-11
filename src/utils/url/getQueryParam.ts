export const getQueryParam = (name: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}