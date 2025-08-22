import styled from "@emotion/styled";
import Buttons from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form/form.alternate.style";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import Lucide from "@/lib/theme/snippets/lucide";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled.div`
	justify-self: center;
	// TODO: this should be part of the page wrapper -- but first Register should
	// be put inside a page wrapper :)
	padding-top: ${spacingValue.medium};
`;

// TODO: why is there nothing like this in F?
const Fields = styled.div`
	${flex.column};
	gap: ${spacingValue.small};
`;

const ShowPassword = styled(Buttons.Unstyled)`
	position: absolute;
	right: 1rem;
	top: 0;
	max-height: max-content;

	${Lucide.PasswordEye};
`;

// TODO: conflate styles for these submit buttons. I don't like the default
// padding, so why not just change that instead of overriding it here?
const Submit = styled(F.Submit)`
	padding: 0.5rem 1rem;
`;

// TODO -- this is adapted from NewFieldTemplate.style. Extract it.
const Column = styled.fieldset`
	${flex.column};

	gap: ${spacingValue.smaller};
	margin: 0 ${spacingValue.smallest};
	margin-top: ${spacingValue.small};
	padding: ${spacingValue.small};
	${radius.medium};

	background-color: #e9e9e9;
	${outline.tertiary};
	height: max-content;
`;

export default {
	Wrapper,
	Fields,
	ShowPassword,
	Submit,
	Column,
};
