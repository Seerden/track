import { Unstyled } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { flex } from "@/lib/theme/snippets/flex";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	${flex.column};
	font-size: ${font.size["0.9"]};
	/* width: max-content; */

	// TEMP
`;

const Section = styled.div``;

const TabsHeader = styled.div`
	${flex.row};
	gap: 0.5rem;
	width: max-content;
	height: max-content;
	align-self: flex-start;
	border-bottom: 2px solid #ccc;
	margin: 0 1rem;
	z-index: 2; // to get above the box-shadow of TabsPanel
	font-size: ${font.size["1"]};
`;

const TabsPanel = styled.div`
	padding: 1rem;
	background-color: #eee;
	border-radius: 0.5rem;
	background-color: #f5f5f5;

	outline: 2px solid #ddd;
	border: 2px solid #fff;
	box-shadow: 0 0.6rem 1rem -0.5rem #999;
	transform-origin: bottom center;
`;

const Tab = styled(Unstyled)<{
	$active?: boolean;
}>`
	width: max-content;

	margin-bottom: -2px;
	border-bottom: 2px solid ${(p) => (p.$active ? "royalblue" : "transparent")};

	transition: all 50ms linear;
`;

const TabInner = styled.div<{ $active?: boolean }>`
	border-radius: 5px 5px 0 0;
	padding: 0.2rem 0.5rem;
	margin: 0 0.5rem;

	${(p) =>
		p.$active &&
		css`
			background-color: royalblue;
			color: white;
		`}

	transition: all 50ms linear;
`;

const Label = styled.label<{ $active?: boolean }>`
	width: 100%;
	padding: 0.2rem 0.5rem;
	border-radius: 5px;

	${(p) =>
		p.$active &&
		css`
			background-color: royalblue;
			color: white;
		`}
`;

const SectionContent = styled.div`
	${flex.column}
`;

const SectionActionBar = styled.div`
	${flex.row};
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
`;

const Toggle = styled(Unstyled)<{ $active?: boolean }>`
	${noBorders};
	display: flex;
	width: max-content;
	border-radius: 5px;
	gap: 0.5rem;

	padding: 0.2rem 0.5rem;

	border: 2px solid transparent;
	// select if has checked input
	${(p) =>
		p.$active &&
		css`
			background-color: royalblue;
			color: white;
		`}
`;

const Select = styled.select`
	display: inline-flex;
	${noBorders};
	background-color: #ddd;
`;

const Input = styled.input`
	display: inline-flex;
	${noBorders};
	background-color: transparent;
`;

const InputWithSelect = styled.div`
	${flex.row};
	gap: 0.5rem;
	height: max-content;
	border: 2px solid #ddd;
	box-shadow: 0 0.3rem 0.5rem -0.3rem #ccc;
	border-radius: 5px;

	select {
		width: 10ch;
	}
`;

// need to combine this with the regular section content, but the styling is
// different for datetime and tags, because tags has an action bar
const DatetimeSectionContent = styled.div`
	${flex.row};
	margin-top: 0.5rem;
	gap: 0.5rem;
`;

const DatetimeSectionColumn = styled.div`
	${flex.column};
`;

const ResetButton = styled(Unstyled)`
	margin-bottom: 1rem;

	&:hover {
		svg {
			color: orangered;
		}
	}
`;
ResetButton.defaultProps = {
	type: "reset"
};

export default {
	Wrapper,
	Section,
	TabsHeader,
	TabsPanel,
	Tab,
	TabInner,
	Label,
	Toggle,
	SectionContent,
	SectionActionBar,
	Select,
	Input,
	InputWithSelect,
	DatetimeSectionContent,
	DatetimeSectionColumn,
	ResetButton
};
