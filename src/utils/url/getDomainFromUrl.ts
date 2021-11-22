// PE 1/3 - remove?
export const getDomainFromUrl = (url: string) => {
  const domain = new URL(url);
  return domain.hostname.replace("www.", "");
};
