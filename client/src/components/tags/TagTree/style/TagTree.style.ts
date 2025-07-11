import BadgeStyles from "@/lib/theme/components/Badge.style";
import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const colors = ["dodgerblue", "blueviolet", "darkorchid", "darkviolet", "indigo"];

const TagName = styled.label<{ $level: number }>`
	font-size: ${(p) => getFontSize(p, 0.9)};
	min-width: 50px;
	position: relative;

	${(p) =>
		p.as === "label" &&
		`
      cursor: pointer;
   `}

	${(p) =>
		p.as === "span" &&
		`
      cursor: default;
      user-select: none;
   `}

	${flex.row};
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	${spacing.margin.wide({ size: 0.3, ratio: 2 })};
	${spacing.padding.wide({ size: 0.3, ratio: 1.5 })};
	outline: 2px solid #eee;
	border-radius: 4px;
	box-shadow: 0.6rem 0.6rem 0 -0.3rem #ddd;

	background-color: ${(p) =>
		p.$level === 0 ? "dodgerblue" : colors[p.$level % colors.length]};
	color: white;
	max-height: max-content;
	/* width: max-content; */

	${BadgeStyles.Badge} {
		position: absolute;
		right: -1rem;
		top: -0.5rem;
	}
`;

export const Tag = styled(motion.li)<{ $level: number }>`
	${flex.column};
	justify-content: center;
	list-style: none;
	/* margin-left: ${(p) => p.$level * 1}rem; */
	font-weight: ${(p) => (p.$level === 0 ? "bold" : "normal")};
	border-left: ${(p) => (p.$level === 0 ? 0 : 3)}px solid
		${(p) => (p.$level === 0 ? "transparent " : colors[(p.$level - 1) % colors.length])};

	/* :not(:nth-of-type(1)) {
		margin-top: 0.5rem; // might look better without this
	} */

	margin-bottom: ${(p) => (p.$level == 0 ? "1.5rem" : "0")};
`;

export const Children = styled(motion.ul)<{ $collapsed?: boolean }>`
	transform-origin: center bottom;
	margin-left: 1.5rem;
	/* margin-right: 1.5rem; // might look better with this. */

	${(p) =>
		p.$collapsed &&
		css`
			visibility: hidden;
			height: 0;
		`}

	${Tag} {
		&:nth-last-of-type(1) {
			margin-bottom: 0.5rem;
		}
	}
`;

const Tree = styled.ul<{
	$orientation?: "horizontal" | "vertical"; // TODO: figure out what the component should look like when vertical
	$columnCount: number;
}>`
	max-height: 900px;
	padding: 1rem;
	margin-right: -1rem;
	width: max-content;
	min-width: 350px;
	max-width: 100%;
	width: 100%;
	display: grid;
	gap: 2rem;

	> ${Tag} {
		min-width: 150px; // TODO: this is temporary and needs to become responsive
		height: 98%;
		justify-content: flex-start;
		width: max-content;
		border-radius: 4px;
		> ${TagName} {
			justify-self: center;
			width: 100%;
			margin: 0;
			box-shadow: none;
		}
		box-shadow: 0 0 1rem 0rem #ccc;
		outline: 2px solid white;
		background-color: #eaeaea;

		> ${Children} {
			min-height: 2rem;
		}
	}

	${(p) =>
		p.$orientation === "horizontal"
			? css`
					align-items: flex-start;
					overflow-x: scroll;
					overflow-y: hidden;
					white-space: nowrap;
					grid-template-columns: repeat(${p.$columnCount ?? 1}, minmax(auto, 1fr));
				`
			: css`
					flex-direction: column; // TODO: does this do anything? display is grid
					overflow-x: hidden;
					overflow-y: scroll;
				`}
`;

const Container = styled.div`
	width: 90vw;
	max-width: 90vw;
	${flex.column};
	box-shadow:
		0.5rem 0.5rem 0 -0.3rem ${(p) => p.theme.colors.blue.main},
		0 0 0.8rem 0 #ccc;
	${spacing.padding.wide({ size: 1, ratio: 2 })}
	border-radius: 3px;
	margin: 3rem auto;
`;

const DropdownCheckbox = styled.input`
	display: none;
`;

export default {
	Tag,
	TagName,
	Children,
	Tree,
	Container,
	DropdownCheckbox
};
