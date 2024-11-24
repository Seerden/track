import HabitStyle from "@/components/habits/Habits/style/Habit.style";
import TagCardStyle from "@/components/tags/TagCard/style/TagCard.style";
import ButtonStyle from "@/lib/theme/components/Button.style";
import ListStyle from "@/lib/theme/components/List.style";
import { font, getFontSize } from "@/lib/theme/font";
import { column } from "@/lib/theme/snippets/column";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const TimelineWrapper = styled.section`
	${flex.column};
	${spacing.padding.wide({ size: 1, ratio: 3 })};
	gap: 1rem;

	max-width: 100%;
	min-width: 500px;

	@media (min-width: 1280px) {
		max-width: 1000px;
	}

	border-radius: 10px;
	background-color: #f9f9f9;
	${spacing.margin.wide({ size: 0.5, ratio: 2 })};
	box-shadow: 0 0.2rem 1rem -0.3rem #ccc;
	outline: 2px solid #eee;

	height: max-content;
	max-height: 80vh;
	overflow: hidden;
	overflow-y: auto;
`;

const NotesWrapper = styled.section`
	${column};
`;

const BlockTitle = styled.h2`
	width: max-content;
	padding: 0.5rem 0;
`;

const Rows = styled.ul`
	${flex.column};
`;

const CheckboxWrapper = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 27px;
	height: 27px;

	.on {
		fill: ${(p) => p.theme.colors.green.main};
	}

	.off {
		fill: #aaa;
	}
`;

const Checkbox = styled.input`
	display: block;
	margin-right: 0.5rem;
	width: max-content;
`;

const Header = styled.header`
	padding: 1rem 0;
	max-width: 500px;

	// this is the element that displays the date
	h1 {
		--font-size: ${(p) => getFontSize(p, 1.1)};
		font-size: var(--font-size);
		line-height: var(--font-size);

		gap: 1rem;

		@media (min-width: 1440px) {
			// this needs to be the same breakpoint as the one in columns
			padding: 0 2rem;
		}

		@media (min-width: 1440px) {
			--font-size: ${(p) => getFontSize(p, 1.5)};
			font-size: var(--font-size);
			line-height: var(--font-size);
		}

		font-weight: 400;
		margin: 0;
		padding: 0;

		/* These flex styles are there to keep space between the title and the
      day-change buttons. */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`; // is a header the right tag, semantically?

const Columns = styled.div`
	display: grid;

	grid-template-areas:
		"calendar timeline timeline"
		". timeline timeline"
		"things things things";

	@media (min-width: 1280px) {
		grid-template-areas:
			"calendar timeline things"
			". timeline things"
			". timeline things"
			". timeline things";
	}

	grid-template-columns: auto 1fr 1fr;

	gap: 0.5rem;
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

	${TagCardStyle.Tag} {
		display: flex;
		max-height: 30px;
		flex: 1;
		overflow-y: visible;
		white-space: nowrap;
		max-width: 100%;
		justify-content: center;
	}
`;

const AllDayActivityList = styled.ul`
	${flex.column};
	gap: 0.7rem;
	width: max-content;
	padding-inline: 3rem;
`;

const Habits = styled.div`
	grid-area: habits;
	/* the Habits component is an ItemList, and each Habit is an Item, so we can
   tweak the styles if we target those styled components. */
	${ListStyle.ItemList} {
		gap: 0.2rem;

		* {
			font-size: ${font.size["0.8"]};
		}

		${ListStyle.Item} {
			border-radius: 2px;
			border: 1px solid white;

			box-shadow:
				0 0rem 0.3rem 0 #ccc,
				0 0 0.3rem 0 #ddd;
			background-color: #eee;

			// TODO: I want this to exactly match the spacing of AllDayActivityList
			${spacing.padding.wide({ size: 0.3, ratio: 3 })}

			${ListStyle.ItemName} {
				box-shadow: 0 0 0.1rem 0 #777;
				border: 1px solid white;
			}

			${ListStyle.Info}, label {
				/* color: white; */
			}

			${HabitStyle.CompletionWrapper} {
				background-color: #eee;
				${spacing.padding.wide({ size: 0.1, ratio: 3 })};
				border-radius: 3px;

				span {
					color: black;
				}

				// slider background mantine
				* {
					--slider-track-bg: #d5d5d5;
				}
			}
		}
	}
`;

const Create = styled.div`
	position: fixed;
	bottom: 10rem;
	right: 10rem;
	z-index: 100;
`;

const SpeedDialActions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	justify-content: center;
	padding: 0 1rem;
	border-radius: 3px;
	align-items: center;
	font-size: 0.8rem;
`;

const SpeedDialButton = styled(ButtonStyle.Edit)`
	width: calc(100% + 2rem);
	border-radius: 5px;
`;

// TODO: rename this
const Things = styled.div`
	grid-area: things;
	display: flex;

	flex-direction: row;

	@media (min-width: 1280px) {
		flex-direction: column;
	}
`;

export default {
	TimelineWrapper,
	NotesWrapper,
	BlockTitle,
	Rows,
	CheckboxWrapper,
	Checkbox,
	Columns,
	Header,
	Tags,
	AllDayActivityList,
	Habits,
	Create,
	SpeedDialActions,
	SpeedDialButton,
	Things
};
