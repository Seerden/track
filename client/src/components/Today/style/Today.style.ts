import TagCardStyle from "@/components/tags/TagCard/style/TagCard.style";
import { getFontSize } from "@/lib/theme/font";
import { column } from "@/lib/theme/snippets/column";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

const TimelineWrapper = styled.section`
	${flex.column};
	${spacing.padding.wide({ size: 1, ratio: 3 })};
	gap: ${spacingValue.medium};
	${radius.large};
	${spacing.margin.wide({ size: 0.5, ratio: 2 })};
	${outline.secondary};

	max-width: 100%;
	min-width: 500px;

	@media (min-width: 1280px) {
		max-width: 1000px;
	}

	background-color: #f9f9f9;
	box-shadow: 0 0.2rem 1rem -0.3rem #ccc;

	height: max-content;
	max-height: 80vh;
	overflow: hidden;
	overflow-y: auto;

	${scrollbar.customVertical};
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

// TODO: rename this
const Things = styled.div`
	${flex.row};

	grid-area: things;
	@media (min-width: 1280px) {
		flex-direction: column;
	}

	gap: 1rem;
`;

export default {
	TimelineWrapper,
	NotesWrapper,
	BlockTitle,
	Rows,
	CheckboxWrapper,
	Columns,
	Header,
	Tags,
	AllDayActivityList,
	Things
};
