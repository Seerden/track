import styled from "styled-components";

const Main = styled.main`
	&:nth-child(1) {
		background-color: red;
	}

	&:nth-child(2) {
		padding-top: 2rem;
		border: 2px solid red;
	}
`;

export default {
	Main
};
