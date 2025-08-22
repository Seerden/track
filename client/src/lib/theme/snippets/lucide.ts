import { spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";

const PasswordEye = css`
	.lucide {
		padding: ${spacingValue.smallest};
		margin-top: 5px;
		color: #555;
	}
`;

const BlackInWhite = css`
	.lucide {
		color: black;
		background-color: white;
	}
`;

const Lucide = {
	PasswordEye,
	BlackInWhite,
};

export default Lucide;
