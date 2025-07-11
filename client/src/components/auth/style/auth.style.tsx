import { Unstyled } from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form/form.alternate.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "@emotion/styled";

const Wrapper = styled.div`
	justify-self: center;
	// TODO: this should be part of the page wrapper -- but first Register should
	// be put inside a page wrapper :)
	padding-top: 1rem;
`;

// TODO: why is there nothing like this in F?
const Fields = styled.div`
	${flex.column};
	gap: 0.5rem;
`;

const _ShowPassword = styled(Unstyled)`
	position: absolute;
	right: 1rem;
	top: 0;
	max-height: max-content;

	.lucide {
		padding: 0.2rem;
		margin-top: 5px;
		color: #555;
	}
`;

function ShowPassword(props: Parameters<typeof _ShowPassword>[0]) {
	return <_ShowPassword {...props} type="button" />;
}

const PasswordLabel = styled(F.Label)`
	${flex.column};
`;

// TODO: conflate styles for these submit buttons. I don't like the default
// padding, so why not just change that instead of overriding it here?
const Submit = styled(F.Submit)`
	padding: 0.5rem 1rem;
`;

// TODO -- this is adapted from NewFieldTemplate.style. Extract it.
const Column = styled.fieldset`
	${flex.column};

	gap: 0.3rem;
	margin: 0 0.2rem;
	margin-top: 0.5rem;
	background-color: #e9e9e9;
	padding: 0.5rem;
	outline: 2px solid #ddd;
	border-radius: 5px;
	height: max-content;
`;

export default {
	Wrapper,
	Fields,
	ShowPassword,
	PasswordLabel,
	Submit,
	Column
};
