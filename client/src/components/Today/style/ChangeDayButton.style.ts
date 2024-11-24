import ActionButtons from "@/lib/theme/components/buttons/Action";
import { styled } from "styled-components";

const ChangeDayButton = styled(ActionButtons.Default)<{
	$size: number;
	$direction: "left" | "right";
}>`
	--size: calc(${(p) => p.$size}px + 0.2rem);
	max-width: var(--size);
	max-height: var(--size);
	min-width: var(--size);
	min-height: var(--size);

	margin-top: 0.2rem; // slight offset makes it look more centered than actually centering it with the text

	&:hover,
	&:focus,
	&:active {
		transform: translateX(${(p) => (p.$direction === "left" ? "-0.3rem" : "0.3rem")});
	}
`;

export default {
	ChangeDayButton
};
