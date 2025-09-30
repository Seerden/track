import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import duration from "dayjs/plugin/duration.js";
import localeData from "dayjs/plugin/localeData.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import tz from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const day = dayjs;

export default day;
