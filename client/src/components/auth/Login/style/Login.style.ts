import { Unstyled } from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form/form.alternate.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	justify-self: center;
`;

// TODO: why is there nothing like this in F?
const Fields = styled.div`
	${flex.column};
	gap: 0.5rem;
`;

const ShowPassword = styled(Unstyled)`
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

ShowPassword.defaultProps = {
	type: "button"
};

const PasswordLabel = styled(F.Label)`
	${flex.column};
`;

// TODO: conflate styles for these submit buttons. I don't like the default
// padding, so why not just change that instead of overriding it here?
const Submit = styled(F.Submit)`
	padding: 0.5rem 1rem;
`;

export default {
	Wrapper,
	Fields,
	ShowPassword,
	PasswordLabel,
	Submit
};
