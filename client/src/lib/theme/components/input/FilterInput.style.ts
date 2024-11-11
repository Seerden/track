import { getFontSize } from "@/lib/theme/font";
import { inputStyle } from "@/lib/theme/snippets/input";
import styled from "styled-components";

const FilterInput = styled.input`
	${inputStyle};

	max-width: 150px;

	--font-size: ${(p) => getFontSize(p, 0.88)};
	font-size: var(--font-size);
	line-height: var(--font-size); // inputStyle does not have this

	outline: 2px solid #ccc;

	&:focus {
		outline-color: ${(p) => p.theme.colors.blue.secondary};
		box-shadow: 0rem 0.5rem 0.2rem -0.2rem #ccc;
	}
`;

export default FilterInput;
