import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import type { MainTheme } from "@/lib/style/theme";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";

const minimal = ({ theme }: { theme: MainTheme }) => css`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}
	${radius.medium};
	
   outline: 2px solid var(--bg-3-2);
	border: 2px solid ${theme.colors.background.main[0]};
	box-shadow: 0 0.5rem 1rem 0 var(--shadow-1, transparent);
`;

export const containers = {
	minimal,
};

const FieldWrapper = styled.div<{ $small?: boolean }>`
	${(p) => spacing.padding.wide({ size: p.$small ? 0.2 : 0.5, ratio: 2 })}

	${radius.medium};
	outline: 2px solid ${(p) => p.theme.colors.background.main[4]};
	margin: ${spacingValue.smaller};
`;

// TODO TRK-231: this concept of a generic flex row is work in progress.
const Row = styled(motion.div)<{
	gap?: keyof typeof spacingValue;
	padding?: keyof typeof spacingValue;
}>`
	${flex.row};
	${(p) =>
		p.gap &&
		css`
			gap: ${spacingValue[p.gap]};
		`}

	${(p) =>
		p.padding &&
		css`
			padding: ${spacingValue[p.padding]};
		`}
`;

const Column = styled(motion.div)<{
	gap?: keyof typeof spacingValue;
	padding?: keyof typeof spacingValue;
}>`
	${flex.column};

	${(p) =>
		p.gap &&
		css`
			gap: ${spacingValue[p.gap]};
		`}

	${(p) =>
		p.padding &&
		css`
			padding: ${spacingValue[p.padding]};
		`}
`;

const ActionBar = styled.div`
	${flex.row};
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}
	${radius.small};
	gap: ${spacingValue.small};
	margin-bottom: ${spacingValue.medium};
	outline: 3px solid var(--bg-5-2);

	width: max-content;

	background-color: ${(p) => p.theme.colors.background.main[3]};
	box-shadow: 0 0.3rem 0.5rem -0.1rem var(--bg-3-1);

	position: sticky;
	z-index: 2;
	top: 1.5rem;
`;

const Containers = {
	Field: FieldWrapper,
	Row,
	Column,
	ActionBar,
};

export default Containers;
