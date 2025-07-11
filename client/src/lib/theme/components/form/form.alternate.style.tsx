import { Action } from "@/lib/theme/components/buttons";
import { containers } from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";

/** TODO: I implemented these styles for LogbookForm initially, but I like them
 * enough that I want to implement them as app-wide alternate form styles (in
 * addition to those we use elsewhere. Since they'll be shared, we should
 * extract as many parts to generic snippets as possible for re-use outside of
 * forms, for the consistency of the visual design. */

const Form = styled.form`
	${containers.minimal};

	width: max-content;
`;

const FormTitle = styled.h1`
	${radius.medium};
	gap: ${spacingValue.medium};

	font-size: ${font.size["2"]};
	box-shadow: 0 0.5rem 1.5rem -0.6rem #ccc;

	border-bottom: 3px solid #fff;

	display: flex;
	align-items: center;

	${spacing.padding.wide({ size: 1, ratio: 2 })}
	padding-inline: ${spacingValue.medium};
	padding-bottom: 0.2rem;

	margin: 0;
	margin-bottom: ${spacingValue.medium};
`;

const Label = styled.label`
	${flex.column};
	background-color: #fff;
	${spacing.padding.small};
	${radius.medium}
	box-shadow: 0 0.2rem 0.3rem 0 #ccc;

	span {
		font-size: ${font.size["0.9"]};
		color: #333;
		padding-left: 0.5rem;

		// The following rules are here because of cases where we alias Label to
		// something else (e.g. as="div")
		user-select: none;
		cursor: default;
	}

	input,
	textarea,
	select {
		resize: none;
		margin: 0.3rem;
		font-size: ${font.size["0.93"]};
		border: none;
		line-height: 1.5rem;

		&:not(&[type="checkbox"]) {
			height: 1.5rem;
		}
		background-color: #fff;
		padding: 0.3rem 0.6rem;
		border: 1px solid #ddd;
		border-radius: 3px;
	}
`;

/**
 * @todo extract this Button to theme buttons lib? -- make note of the default margin, which I dislike
 * */
const _Submit = styled(Action.CallToAction)`
	color: black;
	margin-top: 1rem;
	margin-left: 0;

	svg {
		color: royalblue;
		stroke-width: 3;
	}
`;

function Submit(props: Parameters<typeof _Submit>[0]) {
	return <_Submit type="submit" {...props} />;
}

export default { Form, FormTitle, Label, Submit };
