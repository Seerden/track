import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { Nullable } from "@shared/types/data/utility.types";
import type { CSSProperties } from "react";
import {
	default as Unstyled,
	default as UnstyledButton,
} from "@/lib/theme/components/buttons/Unstyled";
import { font } from "@/lib/theme/font";
import { outline, thinOutline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import { colors } from "../../colors";
import Active from "../../snippets/active";
import { flex } from "../../snippets/flex";
import { spacing } from "../../snippets/spacing";

const highlightColor: CSSProperties["color"] = "royalblue";
export const defaultCellWidth = 25;
export const defaultCellHeight = 25;

/** This Default Cell is used for Calendar buttons. */
const Default = styled(Unstyled)<{
	$selected?: boolean;
	$highlight?: boolean;
	$width?: number;
	$height?: number;
}>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${(p) => p.$width ?? defaultCellWidth}px;
	height: ${(p) => p.$height ?? defaultCellHeight}px;

	${(p) =>
		// a 'null' cell has no children, so this is nicer than using something like
		// an EmptyCell, keeps the JSX cleaner.
		p.children
			? css`
					cursor: pointer;

					background-color: #f9f9f9; // TODO TRK-231: theme value
					${thinOutline.secondary};
					${radius.small};

					&:active {
						background-color: ${highlightColor};
						color: azure; // TODO: TRK-231: theme value
						outline: none;
					}
				`
			: css`
					cursor: default;
					background-color: unset;
					border-radius: 0;
					box-shadow: none;
				`}

	&:focus {
		${outline.tertiary};
	}

	&:hover {
		${(p) =>
			!p.$selected &&
			!!p.children &&
			css`
				transition: all 35ms linear;
				background-color: dodgerblue;
				color: white;
				box-shadow: 0 0 0.3rem 0 #ddd;
			`}

   }
   
   &:disabled {
      outline-color: transparent;
   }

	${(p) =>
		p.$highlight &&
		css`
			background-color: #eee;
			color: #333;
			font-weight: 600;
		`}

	${(p) =>
		p.$selected &&
		css`
			background-color: ${highlightColor};
			color: azure; // TODO TRK-231: theme value
			box-shadow: 0 0 0.2rem 0 #ccc;
		`}
`;

const Habit = styled(Default)<{
	$cellDone?: Nullable<boolean>;
	$cellTouched?: Nullable<boolean>;
	$intervalDone?: Nullable<boolean>;
}>`
   border-radius: 50%;

   --inner-color: ${(p) => (p.$cellDone ? "forestgreen" : p.$cellTouched ? colors.purple.tertiary : "#e2e2e2")};
   --outer-color: ${(p) => (p.$intervalDone ? "forestgreen" : p.$cellTouched ? colors.purple.tertiary : "#e2e2e2")};

   font-size: ${font.size["0.7"]};;

   background-color: var(--inner-color);
   outline: 3px solid var(--outer-color);
   border: 2px solid #f2f2f2;

   &:disabled {
      background-color: unset;
      /* TODO: once the feature to extend the calendar by optionally including
      days from overlapping months to be shown, this might change, or might not
      (because those cells probably won't be "disabled") */
      border: none;
      outline-color: transparent;
   };

   color: ${(p) => (p.$cellDone || p.$cellTouched ? "white" : "inherit")};

   &:not(:disabled) {
      /* These styles are repeated from above, because otherwise they're
      overwritten by the interaction styles from Default */
      &:hover, &:active, &:focus {
         background-color: var(--inner-color);
         outline: 3px solid var(--outer-color) ;
         color: ${(p) => (p.$cellDone || p.$cellTouched ? "white" : "inherit")};
      }

      &:active, &:focus {
         box-shadow: 0 0 0.5rem 0 #333;
      }

      &:hover {
         box-shadow: 0 0 0.4rem 0 #666;
      }
   }
`;

const DaySelector = styled(UnstyledButton)<{ $active?: boolean }>`
	${flex.centered};
	font-size: ${font.size["0.85"]};;

	--cell-size: 22px;
	width: var(--cell-size);
	height: var(--cell-size);
	${spacing.margin.smaller}
	${radius.small};
	background-color: #dfdfdf; // TODO: theme value

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.blue.main};
			color: #fff;
		`}

	${Active.default};
`;

const CellButtons = {
	Default,
	DaySelector,
	Habit,
};

export default CellButtons;
