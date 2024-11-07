import { getFontSize } from "@/lib/theme/font";
import styled from "styled-components";
import S from "./Today.style";

const AllDayActivity = styled.li`
	user-select: none;
	cursor: pointer;
	position: relative;
	list-style: none;
	background-color: dodgerblue;
	color: white;
	padding: 0.2rem 1rem;
	font-size: ${(p) => getFontSize(p, 0.93)};
	border-radius: 3px;
	outline: 2px solid dodgerblue;
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	padding-left: 0.3rem;

	// TODO: this targets the icon, but should be something other than a p tag
	p {
		display: flex;
		align-items: center;
		justify-content: center;
		outline: 2px solid white;
		border-radius: 7px;
		padding: 0.05rem;
		--size: 22px;
		width: var(--size);
		height: var(--size);
		background-color: azure;

		svg {
			fill: black;
		}

		box-shadow: 0 0 0.3rem 0 #333;
	}

	/* TODO: really should extract all of these checkbox styles */
	${S.CheckboxWrapper} {
		margin-left: 1rem;
		background-color: white;
		border-radius: 50%;
	}
`;

export default {
	AllDayActivity
};
