import C from "./style/CurrentTimeMark.style";

type CurrentTimeMarkProps = {
	offset: number;
};

export default function CurrentTimeMark({ offset }: CurrentTimeMarkProps) {
	return (
		<C.CurrentTimeMark aria-hidden $offset={offset}>
			<C.Circle />
		</C.CurrentTimeMark>
	);
}
