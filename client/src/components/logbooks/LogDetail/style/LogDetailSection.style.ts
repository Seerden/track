import {
	headerStyle,
	itemSectionStyle
} from "@/components/logbooks/LogDetail/style/_shared.style";
import { font } from "@/lib/theme/font";
import styled from "styled-components";

const Header = styled.h1`
	font-size: ${font.size["2"]};
	${headerStyle};
	background-color: #fff;
`;

const Subtitle = styled.h2`
	${headerStyle};
	font-size: ${font.size["1.2"]};
	width: max-content;
	border-radius: 2px;
	margin-bottom: 0.5rem;
`;

const ItemSections = styled.div`
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-column-gap: 3rem;
`;

// TODO: name this similarly to the add section wrapper in the log detail
const AddSectionWrapper = styled.div`
	${itemSectionStyle};
`;

export default { Header, Subtitle, ItemSections, AddSectionWrapper };
