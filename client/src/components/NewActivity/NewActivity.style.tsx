import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import { inputStyle } from "@lib/theme/snippets/input";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	padding-top: 0.8rem;
	margin: 1.2rem;
	border: 2px solid #ccc;
	box-shadow: 0 0 0.5rem 0 #aaa;
	max-width: 500px;

	h1 {
		font-size: ${(p) => getFontSize(p, 1.1)};
		margin: 0;
		margin-left: 0.8rem;
		margin-top: -1.5rem;
		margin-bottom: 0.9rem;

		max-width: max-content;
		background-color: #ddd;
		${spacing.padding.wide({ size: 0.5, ratio: 3 })};
		box-shadow:
			-0.2rem 0.2rem 0 0 #ccc,
			-0.6rem -0.4rem 0 0 deepskyblue,
			0 0 0.2rem 0 #333,
			-0.2rem -0.3rem 0 0 white;
	}
`;

export const Row = styled.fieldset`
	padding: 0.5rem;
	${flex.row};

	width: 100%;
	max-width: 100%;
	border: 1px solid #ccc;
	justify-content: space-between;
	box-shadow: 0.6rem 0.6rem 0 -0.5rem #555;

	&:focus-within {
		border-left-color: deepskyblue;
	}
`;

export const Form = styled.form`
	${flex.column};
	gap: 0.5rem;
`;

export const Button = styled.button`
	${spacing.padding.wide({ size: 0.6, ratio: 2.5 })};
	margin-bottom: -1.5rem;
	margin-top: 0.3rem;
	align-self: center;
	width: max-content;
	font-size: ${(p) => getFontSize(p, 0.9)};
	background-color: #ddd;
	border-radius: 5px;
	border: 2px solid transparent;
	box-shadow:
		0.1rem 0.1rem 0 0 white,
		0.5rem 0.5rem 0 0 deepskyblue;

	&:hover,
	&:focus,
	&:active {
		background-color: #eee;
		transform: translateY(-2px);
		border-color: deepskyblue;
	}
`;

export const Label = styled.label<{ $showWarning?: boolean }>`
	font-size: ${(p) => getFontSize(p, 0.9)};

	${flex.column};
	width: 75%;
	border-radius: 0 15px 0 0;
	margin: 0;

	&:active,
	&:focus-within {
		outline: 2px solid deepskyblue;
		span {
			outline: 2px solid white;
		}
	}

	span {
		background-color: #fff;
		${spacing.padding.wide({ size: 0.2, ratio: 3 })};
		border-radius: 0 15px 0 0;
		font-size: ${(p) => getFontSize(p, 0.9)};
	}

	input {
		&:not([type="checkbox"]) {
			/* max-width: 150px;
			width: 150px; */

			${inputStyle}
		}
	}

	outline: 2px solid ${(p) => (p.$showWarning ? "orangered" : "transparent")};
	border-bottom: ${(p) => (p.$showWarning ? css`2px solid orangered` : "")};
`;

export const Task = styled.label`
	${flex.row};
	align-items: center;
	padding: 0 1rem;
	gap: 0.2rem;

	background-color: #eaeaea;
	${spacing.margin.wide({ size: 0.2, ratio: 2.5 })}
	border: 2px solid white;
	border-radius: 3px;

	input[type="checkbox"] {
		width: 0;
	}

	svg {
		max-height: 100%;
		width: 27px;
		display: flex;
		align-self: center;
		justify-self: center;

		&.on {
			color: ${(p) => p.theme.colors.green.main};
		}

		&.off {
			color: #ccc;
		}
	}

	&:active,
	&:hover,
	&:focus-within {
		svg {
			&.on {
				color: limegreen;
			}
			&.off {
				color: #bbb;
			}
		}
	}
`;
