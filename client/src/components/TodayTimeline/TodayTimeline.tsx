import { defaultWidth, entries } from "./mock";
import * as S from "./TodayTimeline.style";
import useTimeline from "./useTimeline";

const jsxEntries = entries.map((entry, index) => (
	<S.TimelineEntry
		key={index}
		color={entry.color}
		width={defaultWidth * (entry.end - entry.start)}
		left={defaultWidth * entry.start}
		title={entry.title}
	/>
));

function TodayTimeline() {
	const { width, nowFraction } = useTimeline();

	return (
		<S.Timeline>
			<S.Body
				style={{
					width,
					height: "120px"
				}}
			/>
			<S.NowMark left={nowFraction * width} />
			{jsxEntries}
		</S.Timeline>
	);
}

export default TodayTimeline;
