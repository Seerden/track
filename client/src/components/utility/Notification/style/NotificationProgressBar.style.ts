import styled from "styled-components";

const Bar = styled.div`
	content: "";

	position: absolute;
	bottom: 5px;
	left: 5px;

	height: 3px;

	/* --contrast is set in Container (Notification.style), and the only use
      of this Bar component as yet is to be directly inside Container, so --contrast
      should exist. */
	background-color: var(--contrast, #fff);

	z-index: 100;
	border-radius: 5px;
`;
export default { Bar };
