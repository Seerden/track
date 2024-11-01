import { formatHour } from "@lib/datetime/format-date";
import H from "./style/HourMark.style";

type HourMarkProps = {
	index: number;
};

export default function HourMark({ index }: HourMarkProps) {
	const label = formatHour(index);
	return <H.HourMark>{label}</H.HourMark>;
}
