import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const minimal = css`
	padding: 0.5rem 1rem;
	border-radius: 5px;
	outline: 2px solid #eee;
	border: 2px solid #fff;
	box-shadow: 0 0.5rem 1rem 0 #ccc;
`;

export const containers = {
	minimal
};

const FieldWrapper = styled.div<{ $small?: boolean }>`
	${(p) => spacing.padding.wide({ size: p.$small ? 0.2 : 0.5, ratio: 2 })}

	border-radius: 5px;
	outline: 2px solid #ddd;
	margin: 0.3rem;
`;

const Containers = {
	Field: FieldWrapper
};

export default Containers;
