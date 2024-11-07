import { getFontSize } from "@/lib/theme/font";
import styled from "styled-components";

const Wrapper = styled.section`
	padding-top: 1rem;
	min-width: 400px;

	display: grid;
	grid-template-areas:
		"title title"
		"time task"
		"time task"
		"tags tags";
`;

const Title = styled.h2`
	box-shadow: 0 0 0.3rem 0 #888;
	position: relative;

	span {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	grid-area: title;
	font-size: ${(p) => getFontSize(p, 1.5)};
	line-height: 2rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	background-color: indigo;
	color: white;
	padding: 0.5rem;
	padding-right: 1.5rem;
	border-radius: 3px 3px 10px 3px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1rem;
	width: max-content;
	max-width: 100%;
`;

const Time = styled.div`
	grid-area: time;
`;

const Description = styled.div``;

const Datetime = styled.div`
	display: flex;
	width: max-content;
	flex-direction: column;
	align-items: flex-end;
	font-size: ${(p) => getFontSize(p, 0.8)};
	margin-top: 0.3rem;
	color: #888;
	margin-left: 0.3rem;
`;

const HumanizedStart = styled.p`
	font-size: ${(p) => getFontSize(p, 0.9)};
	line-height: 0.92rem;
	color: azure;
	background-color: darkorchid;
	border-radius: 3px;
	margin-top: 0.4rem;
	padding: 0.5rem 1rem;
	display: flex;
	width: max-content;
`;

const Tags = styled.ul`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-self: flex-end;
	justify-content: flex-end;
	grid-area: tags;
	margin-top: 0.5rem;
	gap: 0.4rem;
	font-size: ${(p) => getFontSize(p, 0.85)};
	margin-left: auto;
`;

const Tag = styled.li`
	user-select: none;
	list-style: none;
	padding: 0.35rem 0.6rem;
	border-radius: 3px;
	box-shadow: 0.3rem 0.3rem 0 -0.15rem deepskyblue;
	background-color: dodgerblue;
	width: max-content;
	color: azure;
	align-self: flex-end;
	justify-self: flex-end;
`;

const Task = styled.div`
	grid-area: task;
`;

// TODO: like all the other checkbox usages, this should just be part of the Checkbox component
const CheckboxWrapper = styled.label`
	cursor: pointer;
	input[type="checkbox"] {
		display: none;
	}

	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;

	svg {
		border-radius: 50%;
		background-color: azure;

		&.on {
			fill: ${(p) => p.theme.colors.green.main};
			color: white;
		}

		&.off {
			fill: red;
			color: orangered;
		}
	}
`;
const StyledDetailedActivity = {
	Wrapper,
	Title,
	Time,
	Description,
	Datetime,
	HumanizedStart,
	Tags,
	Tag,
	Task,
	CheckboxWrapper
};

export default StyledDetailedActivity;
