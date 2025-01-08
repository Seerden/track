import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

// TODO: put all other floating styles here, too.

const Wrapper = styled.div`
	background-color: #eee;
	padding: 1rem;
	outline: 3px solid #ccc;
	border-radius: 8px;

	z-index: 10;

	box-shadow:
		0 0 0.3rem 0 #777,
		0 0.4rem 0 0 #ccc;

	${flex.row};
	max-width: 500px;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

const Floating = {
	Wrapper
};

export default Floating;
