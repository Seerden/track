import containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import styled from "styled-components";

const Wrapper = styled.section`
	${containers.minimal};
`;

const Header = styled.h1`
	font-size: ${font.size["2"]};
	border-radius: 6px;
	padding-inline: 1rem;
	margin: 0;
	box-shadow: 0 0.5rem 1.5rem -0.6rem #ccc;
	border-bottom: 3px solid #fff;
`;

export default { Wrapper, Header };
