import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import { noBorders } from "@/lib/theme/snippets/border";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

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

	margin: 0.5rem;
	width: 100%;

	border-radius: 0 15px 0 0;

	&:focus-within,
	&:active {
		&:not(:has(*:disabled)) {
			outline: 2px solid ${(p) => p.theme.colors.blue.main};
			span {
				outline: 2px solid white;
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

	${DefaultInput} {
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
	cursor: pointer;
	${flex.row};
	align-items: center;
	justify-content: center;
	gap: 0.2rem;

	margin: 0.5rem;
	padding: 0 1rem;

	width: max-content;

	border: 2px solid white;
	border-radius: 3px;

	background-color: #eaeaea;

	&:hover,
	&:focus-within,
	&:active {
		.off {
			color: #aaa;
		}

		.on {
			color: limegreen;
		}
	}
`;

const Checkbox = styled.input`
	${noBorders};
	width: 0px;
	height: 0px;
	display: none;
`;

const Icon = styled.span`
	${noBorders};
	width: 30px;
	display: flex;
	justify-content: center;

	.off {
		color: #ccc;
	}

	.on {
		color: ${(p) => p.theme.colors.green.main};
	}
`;

const size = "25px";
const Info = styled.div`
	position: absolute;
	top: calc(50% -${size});
	right: calc(-0.25 * ${size});

	background-color: ${(p) => p.theme.colors.blue.main};
	border-radius: 50%;
	color: white;
	outline: 2px solid white;

	display: flex;
	justify-content: center;
	align-items: center;

	width: ${size};
	height: ${size};
`;

export default {
	Form,
	Row,
	Label,
	Fields,
	AllDay,
	Checkbox,
	Icon,
	Info
};
