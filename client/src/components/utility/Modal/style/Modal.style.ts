import ButtonStyle from "@/lib/theme/components/buttons/Button.style";
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

const Close = styled(ButtonStyle.StylizedAction)`
	position: absolute;
	top: -0.9rem;
	right: 1.8rem;
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
		0.8rem 0.8rem 0.1rem -0.2rem #ddd,
		1.1rem -0.5rem 0.1rem -0.2rem ${(p) => p.theme.colors.blue.main};
`;

export default { ModalWrapper, Close, Modal };
