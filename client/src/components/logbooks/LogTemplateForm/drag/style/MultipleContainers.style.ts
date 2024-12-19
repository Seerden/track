import styled from "styled-components";

const ContainersWrapper = styled.div<{ $vertical?: boolean }>`
	display: inline-grid;
	grid-auto-flow: ${(p) => (p.$vertical ? "row" : "column")};
	padding: 20px;
	box-sizing: border-box;
`;

export default {
	ContainersWrapper
};
