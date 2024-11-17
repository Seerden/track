import HabitStyle from "@/components/habits/Habits/style/Habit.style";
import { Tag } from "@/components/tags/TagCard/TagCard.style";
import ListStyle from "@/lib/theme/components/List.style";
import { font, getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const Wrapper = styled.div``;

const TimelineWrapper = styled.section`
	${flex.column};
	gap: 1rem;
	${spacing.padding.wide({ size: 1, ratio: 3 })};

	max-width: 100%;
	min-width: 500px;
	@media (min-width: 1280px) {
		width: 700px;
	}
`;

export const column = css`
	@media (min-width: 1280px) {
		min-width: 350px;
	}
`;

const Column = styled.section`
	${column};
	padding: 0 1rem;
`;

const NotesWrapper = styled(Column)``;

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

const Columns = styled.div`
	display: grid;

	@media (min-width: 1280px) {
		grid-template-columns: max-content auto max-content auto; // TODO: this is still temporary because the whole layout is temporary
	}

	grid-template-columns: 1fr;

	gap: 0.5rem;
`;

const Header = styled.header`
	padding: 1rem 0;

	// this is the element that displays the date
	h1 {
		--font-size: ${(p) => getFontSize(p, 1.2)};
		font-size: var(--font-size);
		line-height: var(--font-size);

		max-width: 40%;

		@media (min-width: 1280px) {
			// this needs to be the same breakpoint as the one in columns
			padding: 0 3rem;
			max-width: 100%;
		}

		@media (min-width: 1440px) {
			--font-size: ${(p) => getFontSize(p, 2)};
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

	${Tag} {
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
	/* the Habits component is an ItemList, and each Habit is an Item, so we can
   tweak the styles if we target those styled components. */
	${ListStyle.ItemList} {
		gap: 0.2rem;
		padding-inline: 3rem;

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

export default {
	Wrapper,
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
	Habits
};
