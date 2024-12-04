import { noBorders } from "@/lib/theme/snippets/border";
import styled from "styled-components";

const Unstyled = styled.input`
	${noBorders};
	background-color: transparent;
	padding: 0;
	margin: 0;
`;

export default Unstyled;
