import styled from "@emotion/styled";
import { radius } from "@/lib/theme/snippets/radius";

const Bar = styled.div`
	content: "";

	position: absolute;
	bottom: 5px;
	left: 5px;

	height: 3px;

	/* --contrast is set in Container (Notification.style), and the only use
      of this Bar component (currently) is directly inside Container, so
      --contrast hould exist. */
	background-color: var(--contrast, #fff);

	z-index: 100;
	${radius.medium};
`;
export default { Bar };
