import styled from "@emotion/styled";
import type { Recurrence } from "@shared/lib/schemas/activity";
import { LucideRepeat } from "lucide-react";
import type { ReactNode } from "react";
import { colors } from "@/lib/theme/colors";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
	return (
		<Containers.Row
			gap="small"
			style={{
				alignItems: "center",
				maxWidth: "300px",
			}}
		>
			<span
				// TODO: this is a badge, put it in style/badges or something
				style={{
					outline: `2px solid ${colors.purple.secondary}`,
					borderRadius: "5px",
					backgroundColor: "#e7e7e7",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "3px",
				}}
			>
				<LucideRepeat size={"15px"} color="black" />
			</span>
			{recurrence.frequency === "calendar" ? (
				<CalendarRecurrenceCard recurrence={recurrence} />
			) : (
				<NumericRecurrenceCard recurrence={recurrence} />
			)}
		</Containers.Row>
	);
}

// TODO: move to style file
const Container = styled.div`
	${flex.row};
	gap: ${spacingValue.small};

	font-size: ${font.size["0.85"]};

	max-width: 250px;
	flex-wrap: wrap;
`;

// TODO: move to style file. it's a badge, so put it in style/badges or something
const Badge = styled.span`
	display: flex;
	width: max-content;
	flex-grow: 1;
	justify-content: center;
	${radius.small};
	color: black;

	${spacing.padding.wide({ size: 0.25, ratio: 2 })};

	user-select: none;

	background-color: #f7f7f7;
`;

function CalendarRecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
	/* calendar recurrence: days of week, days of month
    use little badges for the days of week,
    then an icon that corresponds to "repeats"
    TODO: follow-up: functional calendar intervals (e.g. every 2 weeks, every 3
    months, etc. )

   TODO: would be cool to show a timeWindow-aware calendar/map of upcoming/past
   recurrences
   
   TODO: render the start and end of the recurrence

   */

	let badges: ReactNode[] = [];
	if (recurrence.weekdays?.length) {
		const WeekdayBadges = recurrence.weekdays?.map((day) => (
			<Badge key={day}>{day}</Badge>
		));
		badges = WeekdayBadges satisfies ReactNode[];
	}

	if (recurrence.monthdays?.length) {
		const DayOfMonthBadges = recurrence.monthdays
			?.sort((a, b) => a - b)
			.map((day) => <Badge key={day}>{day}</Badge>);
		badges = DayOfMonthBadges satisfies ReactNode[];
	}

	return (
		<Containers.Column gap="small">
			<p role="heading">
				Occurs on these days every{" "}
				{recurrence.weekdays?.length ? "week" : "month"}:
			</p>
			<Container>{badges}</Container>
		</Containers.Column>
	);
}

function NumericRecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
	return (
		<Container>
			repeats every {recurrence.interval} {recurrence.interval_unit}(s)
		</Container>
	);
}
