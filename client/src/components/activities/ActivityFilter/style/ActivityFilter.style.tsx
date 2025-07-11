import { Unstyled } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	${flex.column};
	font-size: ${font.size["0.9"]};
`;

const Section = styled.div``;

const TabsHeader = styled.div`
	${flex.row};
	gap: ${spacingValue.small};
	margin: 0 ${spacingValue.medium};
	font-size: ${font.size["1"]};

	width: max-content;
	height: max-content;
	align-self: flex-start;

	z-index: 2; // to get above the box-shadow of TabsPanel

	border-bottom: 2px solid #ccc;
`;

const TabsPanel = styled.div`
	${spacing.padding.medium};
	${radius.medium};

	background-color: #eee;
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
	border-bottom: 2px solid
		${(p) => (p.$active ? p.theme.colors.darkBlue.main : "transparent")};

	transition: all 50ms linear;
`;

const TabInner = styled.div<{ $active?: boolean }>`
	border-radius: 5px 5px 0 0;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	margin: 0 ${spacingValue.small};

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.darkBlue.main};
			color: #fff;
		`}

	transition: all 50ms linear;
`;

const Label = styled.label<{ $active?: boolean }>`
	width: 100%;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	${radius.medium};

	${(p) =>
		p.$active &&
		css`
			background-color: ${(p) => p.theme.colors.darkBlue.main};
			color: #fff;
		`}
`;

const SectionContent = styled.div`
	${flex.column}
`;

const SectionActionBar = styled.div`
	${flex.row};
	gap: ${spacingValue.small};
	align-items: center;
	justify-content: center;
`;

const Toggle = styled(Unstyled)<{ $active?: boolean }>`
	display: flex;
	${noBorders};
	${radius.medium};
	gap: ${spacingValue.small};
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};

	width: max-content;
	border: 2px solid transparent;

	${(p) =>
		p.$active &&
		css`
			background-color: ${(p) => p.theme.colors.darkBlue.main};
			color: #fff;
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
	gap: ${spacingValue.small};
	${radius.medium}

	height: max-content;

	border: 2px solid #ddd;
	box-shadow: 0 0.3rem 0.5rem -0.3rem #ccc;

	select {
		width: 10ch;
	}
`;

// TODO: need to combine this with the regular section content, but the styling
// is different for datetime and tags, because tags has an action bar.
const DatetimeSectionContent = styled.div`
	${flex.row};
	margin-top: ${spacingValue.small};
	gap: ${spacingValue.small};
`;

const DatetimeSectionColumn = styled.div`
	${flex.column};
`;

const _ResetButton = styled(Unstyled)`
	margin-bottom: ${spacingValue.medium};

	&:hover {
		svg {
			color: orangered;
		}
	}
`;
function ResetButton(props: Parameters<typeof _ResetButton>[0]) {
	return <_ResetButton {...props} type="reset" />;
}

function getTagBackgroundColor(selected?: boolean, active?: boolean) {
	if (selected && active) return "darkorange";
	if (selected) return "orange";
	if (active) return "#ddd";
	return "#fff";
}

const TagChip = styled(Unstyled)<{
	$selected?: boolean;
	$active?: boolean;
}>`
	cursor: pointer;

	outline: 1px solid #ccc;
	padding: 0.3rem;
	${radius.small};
	flex: 1;

	background-color: ${(p) => getTagBackgroundColor(p.$selected, p.$active)};
	color: ${(p) => (p.$selected || p.$active ? "#fff" : "#000")};
`;

const TagSelectionList = styled.div`
	${flex.row};
	flex-wrap: wrap;
	gap: ${spacingValue.small};
	margin-top: ${spacingValue.small};
	max-width: 327px; // TODO: I just hardcoded this to match the 'action bar' for now, but this should be responsive
`;

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
	ResetButton,
	TagChip,
	TagSelectionList
};
