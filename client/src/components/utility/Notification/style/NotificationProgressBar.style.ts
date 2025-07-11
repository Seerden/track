import styled from "@emotion/styled";

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
	border-radius: 5px;
`;
export default { Bar };
