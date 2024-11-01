import { formatHour } from "@lib/datetime/format-date";
import H from "./style/HourMark.style";

export default function HourMark({ index }: { index: number }) {
	const label = formatHour(index);
	return <H.HourMark>{label}</H.HourMark>;
}
