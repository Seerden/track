import { unstyledButton } from "@/lib/theme/snippets/button";
import styled from "@emotion/styled";

const _UnstyledButton = styled.button`
	${unstyledButton};

	cursor: pointer;
`;

function UnstyledButton(props: Parameters<typeof _UnstyledButton>[0]) {
	return <_UnstyledButton type="button" {...props} />;
}

export default UnstyledButton;
