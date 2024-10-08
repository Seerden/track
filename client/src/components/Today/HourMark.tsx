import { formatHour } from "@lib/datetime/format-date";
import * as S from "./Today.style";

export default function HourMark({ index }: { index: number }) {
	const label = formatHour(index);
	return <S.HourMark>{label}</S.HourMark>;
}
