import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const ModalWrapper = styled.div`
	overflow: hidden;
	z-index: 100; // TODO: should put these indexes somewhere so we can reason about them
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(32, 32, 32, 0.8); // TODO: this should be a theme value
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
`;

const Close = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	--size: 35px;
	width: var(--size);
	height: var(--size);
	position: absolute;
	top: -0.9rem;
	right: 1.8rem;
	background-color: orangered;
	color: orangered;
	border-radius: 50%;

	outline: 2px solid white;
	border: 5px solid orangered;
	box-shadow: none;

	transition: all 35ms linear;

	&:hover,
	&:active,
	&:focus {
		border-radius: 5px;
		background-color: red;
		border-color: red;
	}
`;

const Modal = styled.div`
	position: relative;
	${spacing.padding.wide({ size: 1.2, ratio: 1.25 })}
	background-color: #eee; // TODO: this should be a theme value
	height: max-content;
	margin-top: 25vh; // TODO: this should be responsive, so should everything else obviously
	border: 1px solid #444;
	border-radius: 5px;
	box-shadow:
		0.8rem 0.8rem 0.1rem -0.2rem #aaa,
		1.1rem -0.5rem 0.1rem -0.2rem deepskyblue;
`;

export default { ModalWrapper, Close, Modal };