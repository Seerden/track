import { Tag } from "@/components/TagCard/TagCard.style";
import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const Wrapper = styled.div``;

const TimelineWrapper = styled.section`
	${flex.column};
	gap: 1.5rem;
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
		font-size: ${(p) => getFontSize(p, 1.2)};
		@media (min-width: 1440px) {
			font-size: ${(p) => getFontSize(p, 2)};
		}
		font-weight: 400;
		margin: 0;
		padding: 0;
		width: max-content;
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
	AllDayActivityList
};
