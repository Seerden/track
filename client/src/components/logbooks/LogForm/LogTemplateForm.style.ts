import styled from "styled-components";

const SelectionList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 1rem;

	outline: 3px solid white;
	padding: 1rem;
	border-radius: 3px;
	box-shadow: 0 0.2rem 0.5rem 0 #ccc;

	> ul {
		padding: 1rem 2rem;
		background-color: #e9e9e9;
		border: 2px solid #ccc;
		border-radius: 6px;
	}
`;

export default { SelectionList };
