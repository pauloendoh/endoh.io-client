export const removeDuplicates = <T>(array: T[], idKey: keyof T) => {
  if (array === undefined || array === null) return [];

  const uniqueArray = array.reduce((result, item) => {
    if (result.find((r) => r[idKey] === item[idKey])) return result;

    return [...result, item];
  }, []);

  return uniqueArray;
};
