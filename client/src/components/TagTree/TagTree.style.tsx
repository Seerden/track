import BadgeStyles from "@/lib/theme/components/Badge.style";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const borderColors = ["#444", "#777", "#aaa", "#ddd"];
const colors = ["deepskyblue", "blueviolet", "darkorchid", "darkviolet", "indigo"];

export const TagName = styled.label<{ $level: number }>`
	font-size: 0.9rem;
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

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	margin: 0.3rem 0.5rem;
	padding: 0.5rem 0.7rem;
	outline: 2px solid #eee;
	border-radius: 4px;
	box-shadow: 0.6rem 0.6rem 0 -0.3rem #ddd;

	background-color: ${(p) =>
		p.$level === 0 ? "deepskyblue" : colors[p.$level % colors.length]};
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
	display: flex;
	flex-direction: column;
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

export const Tree = styled.ul<{
	$orientation?: "horizontal" | "vertical";
	$columnCount: number;
}>`
	max-height: 900px;
	overflow-y: scroll;
	padding-right: 1rem;
	padding-top: 0.5rem;
	margin-right: -1rem;
	width: max-content;
	min-width: 350px;
	max-width: 100%;
	width: 100%;
	display: grid;
	gap: 2rem;
	overflow-y: hidden;

	> ${Tag} {
		height: 98%;
		justify-content: flex-start;
		width: max-content;
		> ${TagName} {
			justify-self: center;
			width: 100%;
			margin: 0;
			box-shadow: none;
		}
		box-shadow: 0 0 0 0.1rem #ddd;
		outline: 2px solid white;
		background-color: #ddd;

		> ${Children} {
			min-height: 2rem;
		}
	}

	${(p) =>
		p.$orientation === "horizontal"
			? css`
					align-items: flex-start;
					overflow-x: auto;
					white-space: nowrap;
				`
			: css`
					flex-direction: column;
					overflow-x: hidden;
					overflow-y: scroll;
				`}

	grid-template-columns: repeat(${(p) => p.$columnCount ?? 1}, minmax(auto, 1fr));
`;

export const Container = styled.div`
	width: 90vw;
	max-width: 90vw;
	display: flex;
	flex-direction: column;
	box-shadow:
		0.5rem 0.5rem 0 -0.3rem deepskyblue,
		0 0 0.8rem 0 #ccc;
	padding: 1rem 2rem;
	border-radius: 3px;
	margin: 3rem auto;
`;

export const DropdownCheckbox = styled.input`
	display: none;
`;
