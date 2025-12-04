import { formatHour } from "@lib/datetime/format-date";
import S from "./style/HourMark.style";

export default function HourMark({
	index,
	highlighted,
}: {
	index: number;
	highlighted?: boolean;
}) {
	const label = formatHour(index);
	return <S.HourMark $highlighted={highlighted}>{label}</S.HourMark>;
}
