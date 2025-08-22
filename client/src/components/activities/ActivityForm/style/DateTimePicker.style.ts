import Input from "@/lib/theme/input";
import { border, outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// TODO: rename this
const Form = styled.section`
	display: grid;
	width: 100%;
	gap: 0.1rem;
`;

const Row = styled.div`
	${flex.row};
	justify-content: space-between;
`;

const Label = styled.label<{ $faded?: boolean }>`
	position: relative;
	${flex.column};
	align-items: stretch;

	margin: ${spacingValue.small};
	width: 100%;

	border-radius: 0 15px 0 0;

	&:focus-within,
	&:active {
		&:not(:has(*:disabled)) {
			outline: 2px solid ${(p) => p.theme.colors.blue.main};
			span {
				${outline.primary};
			}
		}
	}

	span {
		font-size: ${(p) => p.theme.font.size["0.9"]};
		background-color: #fff;
		width: 100%;
		${spacing.padding.wide({ size: 0.2, ratio: 3 })};
		border-radius: 0 15px 0 0;
	}

	${Input.Default} {
		&[type="date"] {
			width: 120px;
		}

		&[type="text"] {
			width: 120px;

			&::placeholder {
				opacity: 0.6;
			}
		}
	}

	${(p) =>
		p.$faded &&
		css`
			&:not(:focus-within) {
				opacity: 0.4;
			}
		`}
`;

const Fields = styled.fieldset`
	position: relative;
	${flex.row};

	padding: 0;
	max-width: 100%;

	/* TODO: why is there an empty rule here? */
	${Label} {
		span {
		}
	}
`;

// TODO: these match the styling from Task in ActivityForm, so they should be
// extracted to a shared snippet.
const AllDay = styled.label`
	${flex.row};
	${flex.centered};
	width: max-content;
	cursor: pointer;

	gap: ${spacingValue.smallest};
	margin: ${spacingValue.small};
	padding: 0 ${spacingValue.medium};
	${border.primary};
	${radius.small};

	background-color: #eaeaea;
`;

const size = "25px";

const Info = styled.div`
	${flex.centered};

	position: absolute;
	top: calc(50% -${size});
	right: calc(-0.25 * ${size});
	width: ${size};
	height: ${size};

	background-color: ${(p) => p.theme.colors.blue.main};
	color: white;

	${radius.round};
	${outline.primary};
`;

export default {
	Form,
	Row,
	Label,
	Fields,
	AllDay,
	Info,
};
