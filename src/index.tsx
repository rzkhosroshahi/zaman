import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);
dayjs.extend(isSameOrBefore);

export * from "./components/RangeDatePicker";
export * from "./components/DatePicker";
