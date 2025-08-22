import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import { thinBorder } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";
import scrollbar from "@/lib/theme/snippets/scroll";
import { spacing } from "@/lib/theme/snippets/spacing";

const ModalWrapper = styled.div`
	--modal-offset: 5vh;
	@media (min-height: 1080px) {
		--modal-offset: 15vh;
	}
	@media (min-height: 1440px) {
		--modal-offset: 20vh;
	}

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

const Close = styled(Buttons.Action.Stylized)`
	position: absolute;
	top: -0.9rem;
	right: 1.8rem;
`;

const Modal = styled.div`
	position: relative;
	${spacing.padding.wide({ size: 1.2, ratio: 1.25 })}
	background-color: #eee; // TODO: this should be a theme value
	height: max-content;
	${thinBorder.darkish};
	${radius.medium};
	margin-top: var(--modal-offset);
	box-shadow:
		0.8rem 0.8rem 0.1rem -0.2rem #ddd,
		1.1rem -0.5rem 0.1rem -0.2rem ${(p) => p.theme.colors.blue.main};
`;

const ModalChildWrapper = styled.div<{ scrollbarVisible?: boolean }>`
	overflow-y: auto;
	${(p) => !p.scrollbarVisible && scrollbar.hidden}
	max-height: calc(90vh - var(--modal-offset));
`;

export default { ModalWrapper, Close, Modal, ModalChildWrapper };
