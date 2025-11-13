import styled from "@emotion/styled";
import { spacingValue } from "../../snippets/spacing";
import { subgridItem } from "../../snippets/subgrid";

/**
 * @usage in the settings section of Profile.tsx, we use this for the labels.
 * Note that we place this in a grid with columns like `max-content
 * min-content`, because for the toggle labels, we have a label text (span) and
 * a checkbox component. It's pretty hard-coded usage, sure, but I'd rather have
 * it here than inside Profile.style.ts. */
const WithToggle = styled.label`
   cursor: pointer;
   ${subgridItem};
   align-items: center;
   gap: ${spacingValue.medium};
   font-size: 0.95rem;
   border-radius: 2px; // TODO: theme
   background-color: #f7f7f7;
   padding: ${spacingValue.small} ${spacingValue.medium};
`;

export const Label = {
	Settings: {
		WithToggle,
	},
};
