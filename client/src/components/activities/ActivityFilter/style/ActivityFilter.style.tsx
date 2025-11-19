import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import { contrastColor } from "@/lib/theme/contrast";
import { font } from "@/lib/theme/font";
import { noBorders } from "@/lib/theme/snippets/border";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

// TODO TRK-204: combine the styling for this and RecurrenceForm.style.ts
// see https://github.com/Seerden/track/pull/327#discussion_r2205902835

const Wrapper = styled.div`
	${flex.column};
	font-size: ${font.size["0.9"]};

   --background-1: var(--bg-3-2);
   --background-2: var(--bg-4-2);
   --background-3: var(--bg-4-1);
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

	border-bottom: 2px solid var(--bg-3-2);
`;

const TabsPanel = styled.div`
	${spacing.padding.medium};
	${radius.medium};

	background-color: var(--bg-2-1);
	outline: 2px solid var(--bg-4-1);
	border: 2px solid var(--bg-0-2);
	box-shadow: 0 0.6rem 1rem -0.5rem var(--bg-4-1);

	transform-origin: bottom center;
`;

const Tab = styled(Buttons.Unstyled)<{
	$active?: boolean;
}>`
	width: max-content;

	margin-bottom: -2px;
	border-bottom: 2px solid
		${(p) => (p.$active ? p.theme.colors.blue.main : "transparent")};

	transition: all 50ms linear;
`;

const TabInner = styled.div<{ $active?: boolean }>`
	// TODO TRK-231 call this radius.tab or something
	border-radius: 5px 5px 0 0;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	margin: 0 ${spacingValue.small};
   font-size: ${font.size["0.9"]};

   color: ${(p) => contrastColor(p.$active ? p.theme.colors.blue.main : `var(--bg-3-2)`)};
   background-color: ${(p) => (p.$active ? p.theme.colors.blue.main : `var(--bg-3-2)`)};

	transition: all 50ms linear;
`;

const Label = styled.label<{ $active?: boolean }>`
	width: 100%;
	${spacing.padding.wide({ size: 0.2, ratio: 2.5 })};
	${radius.medium};

	${(p) =>
		p.$active &&
		css`
			background-color: ${p.theme.colors.blue.main};
			color: ${contrastColor(p.theme.colors.blue.main)};
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

const Toggle = styled(Buttons.Unstyled)<{ $active?: boolean }>`
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
			background-color: ${p.theme.colors.blue.main};
			color: ${p.theme.colors.text.main[0]};
		`}
`;

const Select = styled.select`
	display: inline-flex;
	${noBorders};
	background-color: ${(p) => p.theme.colors.background.main[4]};
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

	border: 2px solid var(--bg-4-2);
	box-shadow: 0 0.3rem 0.5rem -0.3rem var(--bg-5-2);

	select {
		width: 10ch;
	}
`;

const _ResetButton = styled(Buttons.Unstyled)`
	margin-bottom: ${spacingValue.medium};

	&:hover {
		/* TODO: TRK-231 - lucide.ts? */
		svg {
			color: orangered;
		}
	}
`;
function ResetButton(props: Parameters<typeof _ResetButton>[0]) {
	return <_ResetButton {...props} type="reset" />;
}

// TODO: theme-aware
function getTagBackgroundColor(
	{ theme }: { theme: MainTheme },
	selected?: boolean,
	active?: boolean
) {
	if (selected && active) return "darkorange";
	if (selected) return "orange";
	if (active)
		// bg-?
		return theme.colors.background.main[theme.mode === "light" ? 4 : 1];
	// bg-1
	return theme.colors.background.main[theme.mode === "light" ? 1 : 2];
}

const TagChip = styled(Buttons.Unstyled)<{
	$selected?: boolean;
	$active?: boolean;
}>`
	cursor: pointer;

	outline: 1px solid var(--bg-5-2);
	padding: 0.3rem;
	${radius.small};
	flex: 1;

	background-color: ${(p) => getTagBackgroundColor({ theme: p.theme }, p.$selected, p.$active)};
	color: ${(p) =>
		p.$selected || p.$active
			? p.theme.colors.text.contrast[0]
			: p.theme.colors.text.main[0]};
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
	ResetButton,
	TagChip,
	TagSelectionList,
};
