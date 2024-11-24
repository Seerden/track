import { unstyledButton } from "@/lib/theme/snippets/button";
import styled from "styled-components";

const UnstyledButton = styled.button`
	${unstyledButton};

	cursor: pointer;
`;

UnstyledButton.defaultProps = { type: "button" };

export default UnstyledButton;
