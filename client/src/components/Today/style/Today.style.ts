import styled from "@emotion/styled";
import { Skeleton } from "@mantine/core";
import type { HTMLMotionProps } from "motion/react";
import TagCard from "@/components/tags/TagCard/style/TagCard.style";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const TimelineSkeleton = styled(Skeleton)`
   border-top: 2px solid ${(p) => p.theme.colors.background.main[3]};
   opacity: 0.4;
   margin-left: 2rem;
`;

// TODO: move this to subcomponent style file
const TimelineWrapper = styled.section`
	${flex.column};
	
	gap: ${spacingValue.medium};
	${radius.large};
	
   ${spacing.padding.wide({ size: 1, ratio: 3 })};
   
	max-width: 100%;
	min-width: 500px;
   
	@media (min-width: 1280px) {
      max-width: 1000px;
	}
   
	background-color: ${(p) => p.theme.colors.background.main[1]};

   /* NOTE: same as Calendar wrapper */
   outline: 2px solid ${(p) => lightDark(p, p.theme.colors.light[3], p.theme.colors.dark[1])};
	box-shadow: 0 0.2rem 1rem -0.3rem ${(p) =>
		lightDark(p, p.theme.colors.light[5], p.theme.colors.dark[0])};

	height: max-content;
	max-height: 80vh;
	overflow: hidden;
	overflow-y: auto;

	${scrollbar.customVertical};
`;

/** a `filterableItem` is e.g. a task in Tasks, or a habit in Habits. Their
 * respective filters may cause them to be animated in/out. */
export const filterableItem: HTMLMotionProps<"div"> = {
	layout: true,
	initial: {
		opacity: 0,
		x: -10,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: 10,
	},
	transition: {
		duration: 0.1,
		ease: "easeOut",
	},
};

/** a `filterableContainer` is what wraps the list of tasks in Tasks, or habits in
 * Habits. The container is animated down when the filter appears, so that all
 * the items remain visible. */
export const filterableContainer: (
	filtering: boolean
) => HTMLMotionProps<"div"> = (filtering) => ({
	layout: true,
	animate: {
		marginTop: filtering ? 70 : 0,
	},
});

const BlockTitle = styled.h2`
   width: 100%;
   display: flex;
	padding: 0.5rem 0;
   padding-right: ${spacingValue.small};
   justify-content: space-between;
   align-items: center;
`;

const CheckboxWrapper = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 27px;
	height: 27px;
`;

const Header = styled.header`
	/* this is here so we can absolutely position the overdue tasks indicator */
	position: relative;
	padding: 1rem 0;
	width: 100%;

	// this is the element that displays the date
	h1 {
		--font-size: ${font.size["1.5"]};;
		font-size: var(--font-size);
		line-height: var(--font-size);

		gap: 1rem;

		@media (min-width: 1320px) {
			// this needs to be the same breakpoint as the one in columns
			padding: 0 2rem;
		}

		@media (min-width: 1440px) {
			--font-size: ${font.size["1.5"]};;
			font-size: var(--font-size);
			line-height: var(--font-size);
		}

		font-weight: 400;
		margin: 0;
		padding: 0;

		/* These flex styles are there to keep space between the title and the
      day-change buttons. */
		display: flex;
		align-items: center;
	}
`; // is a header the right tag, semantically?

const Columns = styled.div`
	display: grid;

	grid-template-areas:
		"calendar timeline things"
		". timeline things"
		". timeline things"
		". timeline things";

	@media (width < 1320px) {
		grid-template-areas:
			"calendar timeline timeline"
			". timeline timeline"
			". things things";
	}

	@media (width < 880px) {
		grid-template-areas:
			"calendar calendar calendar"
			"timeline timeline timeline"
			"things things things";
	}

	grid-template-columns: auto 1fr 1fr;

   gap: 1rem;

   padding: 1rem;
`;

const Tags = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	gap: 0.4rem;
	max-width: 250px;
	justify-self: flex-end;
	flex-wrap: wrap;
	overflow-y: hidden;
	max-height: 70px;

	${TagCard.Tag} {
		display: flex;
		max-height: 30px;
		flex: 1;
		overflow-y: visible;
		white-space: nowrap;
		max-width: 100%;
		justify-content: center;
	}
`;

const OverdueTasksColumn = styled(Containers.Column)`
   padding-top: ${spacingValue.small};
   min-width: 500px;
   max-height: 50vh;
   overflow-y: auto;
`;

const Section = styled(Containers.Column)`
   gap: ${spacingValue.medium};
`;

export default {
	TimelineSkeleton,
	TimelineWrapper,
	BlockTitle,
	CheckboxWrapper,
	Columns,
	Header,
	Tags,
	OverdueTasksColumn,
	Section,
};
