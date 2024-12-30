import {
	headerStyle,
	itemSectionStyle
} from "@/components/logbooks/LogDetail/style/_shared.style";
import { font } from "@/lib/theme/font";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const Header = styled.h1`
	font-size: ${font.size["2"]};
	${headerStyle};
	background-color: #fff;
`;

const SubTitle = styled.h2`
	${headerStyle};
	${radius.small};
	margin-bottom: ${spacingValue.small};
	font-size: ${font.size["1.2"]};

	width: max-content;
`;

const ItemSections = styled.div`
	display: grid;

	/* TODO: I had to tweak a lot of the container styles (Page, LogDetail
   wrapper, the actual ItemSection Table, etc.) to get the width of the table to
   look alright for both small and large viewports. I think it'd be easier to
   just use a flexbox for this one, since we're already hardcoding the width of
   the first column anyway, so I doubt that a subgrid is even necessary anymore
   for this. */
	grid-template-columns: 200px 1fr;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	grid-column-gap: 3rem;
`;

// TODO: name this similarly to the add section wrapper in the log detail
const AddSectionWrapper = styled.div`
	${itemSectionStyle};
`;

export default { Header, SubTitle, ItemSections, AddSectionWrapper };
