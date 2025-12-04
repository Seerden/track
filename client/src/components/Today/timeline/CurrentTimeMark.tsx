import S from "./style/CurrentTimeMark.style";

export default function CurrentTimeMark({ offset }: { offset: number }) {
	return (
		<S.CurrentTimeMark aria-hidden $offset={offset}>
			<S.Circle />
		</S.CurrentTimeMark>
	);
}
