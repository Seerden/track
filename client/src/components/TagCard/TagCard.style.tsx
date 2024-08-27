import styled from "styled-components";

export const Tag = styled.div`
	border-radius: 1px;
	padding: 0.4rem 0.9rem;
	background-color: #dfdfdf;
	max-width: max-content;
	font-size: 0.9rem;
	user-select: none; //  TODO: when tags become clickable, this disappears; use a button insted
`;
