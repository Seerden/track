import styled from "styled-components";

const size = `35px`;

export const Button = styled.button`
	width: ${size};
	height: ${size};
	border-radius: 50%;
	justify-content: center;
	display: flex;
	position: absolute;
	top: 50%;
	right: -7px;
	align-items: center;
	outline: 1px solid white;
	border: 4px solid transparent;
	box-shadow: 0 0.4rem 0 -0.1rem #ddd;
	margin-top: 0.5rem;
	color: white;
	background-color: limegreen;

	transition: all 25ms linear;
	&:hover {
		background-color: forestgreen;
		box-shadow: 0 0.8rem 0 -0.6rem #ddd;
		transform: translateX(5px);
		border-bottom-color: limegreen;
	}
`;
