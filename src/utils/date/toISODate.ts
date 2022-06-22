import { DateTime } from "luxon";

const toISODate = (ISODateTime: string) => {
  return DateTime.fromISO(ISODateTime).toISODate();
};

export default toISODate;
