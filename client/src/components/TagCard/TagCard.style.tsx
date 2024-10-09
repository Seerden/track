import styled from "styled-components";

export const Tag = styled.div`
	border-radius: 4px;
	padding: 0.3rem 0.6rem;
	background-color: darkorchid;
	color: azure;
	max-width: max-content;
	font-size: 0.9rem;
	user-select: none; //  TODO: when tags become clickable, this disappears; use a button insted
`;
