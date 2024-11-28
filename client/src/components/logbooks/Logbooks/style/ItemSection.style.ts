import { font } from "@/lib/theme/font";
import styled from "styled-components";

const Wrapper = styled.section`
	padding: 0.5rem 1rem;
	border-radius: 5px;
	outline: 2px solid #eee;
	border: 2px solid #fff;
	box-shadow: 0 0.5rem 1rem 0 #ccc;
`;

const Header = styled.h1`
	font-size: ${font.size["2"]};
	border-radius: 6px;
	padding-inline: 1rem;
	margin: 0;
	box-shadow: 0 0.5rem 1.5rem -0.6rem #ccc;
	border-bottom: 2px solid #fff;
`;

export default { Wrapper, Header };
