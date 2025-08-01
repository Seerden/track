import { border, outline, thickOutline, thinOutline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const minimal = css`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })}
	${radius.medium};
	${outline.secondary};
	${border.primary};
	box-shadow: 0 0.5rem 1rem 0 #ccc;
`;

export const containers = {
	minimal
};

const FieldWrapper = styled.div<{ $small?: boolean }>`
	${(p) => spacing.padding.wide({ size: p.$small ? 0.2 : 0.5, ratio: 2 })}

	${radius.medium};
	${outline.tertiary};
	margin: ${spacingValue.smaller};
`;

const EmptyState = styled.div`
	${flex.column};
	${thinOutline.primary};

	width: max-content;
	max-width: 100%;

	box-shadow:
		0.5rem 0.5rem 0 -0.2rem #555,
		0 0 0.6rem 0 #ddd;
	padding: 2rem;

	p {
		background-color: #fff;
		padding: 1rem;
		font-size: 1rem;
		max-width: 400px;
	}
`;

// TODO TRK-231: this concept of a generic flex row is work in progress.
const Row = styled.div<{
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

const Column = styled.div<{
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
	${thickOutline.greyer};

	width: max-content;

	background-color: #eee;
	box-shadow: 0 0.3rem 0.5rem -0.1rem #333;

	position: sticky;
	z-index: 2;
	top: 1.5rem;
`;

const Containers = {
	Field: FieldWrapper,
	EmptyState,
	Row,
	Column,
	ActionBar
};

export default Containers;
