import styled from "styled-components";

const Wrapper = styled.div``;

const TimelineWrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding: 1rem 3rem;
`;

const NotesWrapper = styled.section``;

const BlockTitle = styled.h2`
	width: max-content;
	padding: 0.5rem 1rem;
`;

const Rows = styled.ul`
	display: flex;
	flex-direction: column;
`;

const CheckboxWrapper = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 27px;
	height: 27px;

	.on {
		fill: forestgreen;
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
		grid-template-columns: 1fr max-content auto; // TODO: this is still temporary because the whole layout is temporary
	}

	grid-template-columns: 1fr;

	gap: 0.5rem;
`;

const TimelineHeader = styled.header`
	padding: 1rem 3rem;
	padding-bottom: 0.5rem;

	h1 {
		// this is the element that displays the date
		font-size: 2rem;
		font-weight: 400;
		margin: 0;
	}
`; // is a header the right tag, semantically?

export default {
	Wrapper,
	TimelineWrapper,
	NotesWrapper,
	BlockTitle,
	Rows,
	CheckboxWrapper,
	Checkbox,
	Columns,
	TimelineHeader,
};
