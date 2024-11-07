import { inputStyle } from "@lib/theme/snippets/input";
import styled, { css } from "styled-components";

// TODO: rename this
const Form = styled.section`
	display: grid;
	width: 100%;
	gap: 0.1rem;
`;

const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

const flexRow = css`
	display: flex;
	flex-direction: row;
`;

const Row = styled.div`
	${flexRow};
	justify-content: space-between;
`;

const Label = styled.label<{ $faded?: boolean }>`
	position: relative;
	${flexColumn};
	align-items: stretch;
	margin: 0.5rem;
	width: 100%;

	border-radius: 0 15px 0 0;

	&:focus-within,
	&:active {
		&:not(:has(*:disabled)) {
			outline: 2px solid deepskyblue;
			span {
				outline: 2px solid white;
			}
		}
	}

	span {
		font-size: ${(p) => p.theme.font.size["0.9"]};
		background-color: #fff;
		width: 100%;
		padding: 0.2rem 0.6rem;
		border-radius: 0 15px 0 0;
	}

	input {
		${inputStyle};

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
	${flexRow};
	padding: 0;
	max-width: 100%;

	${Label} {
		span {
		}
	}
`;

// TODO: these match the styling from Task in NewActivity, so they should be
// extracted to a shared snippet.
const AllDay = styled.label`
	${flexRow};
	align-items: center;
	width: max-content;
	border: 2px solid white;
	border-radius: 3px;
	margin: 0.5rem;
	padding: 0 1rem;

	gap: 0.2rem;
	justify-content: center;
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
	outline: none;
	border: none;
	width: 0px;
	height: 0px;
`;

const Icon = styled.span`
	border: none;
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
	background-color: deepskyblue;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${size};
	height: ${size};
	color: white;
	outline: 2px solid white;
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
