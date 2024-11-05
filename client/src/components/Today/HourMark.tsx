import { formatHour } from "@lib/datetime/format-date";
import H from "./style/HourMark.style";

type HourMarkProps = {
	index: number;
	highlighted?: boolean;
};

export default function HourMark({ index, highlighted }: HourMarkProps) {
	const label = formatHour(index);
	return <H.HourMark $highlighted={highlighted}>{label}</H.HourMark>;
}
