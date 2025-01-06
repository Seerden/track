import HabitStyle from "@/components/Today/style/Habit.style";
import ListStyle from "@/lib/theme/components/List.style";
import { font } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

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

export default {
	Habits
};
