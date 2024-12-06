import { css } from "styled-components";

const page = css`
	box-shadow: 0.2rem 0.2rem 0.5rem 0 #dfdfdf;
`;

const input = css`
	box-shadow: 0 0.4rem 0.5rem -0.15rem #c1c1c1;
`;

const card = css`
	box-shadow: 0 0 1rem 0 #bbb;
`;

const cardOffset = css`
	box-shadow: 0 0.2rem 0.4rem 0 #ddd;
`;

const section = css`
	box-shadow: 0 0.3rem 0.3rem 0 #ddd;
`;

const list = css`
	box-shadow: 0 0 0.5rem 0 #ccc;
`;

const shadows = {
	page,
	input,
	card,
	cardOffset,
	section,
	list
};

export default shadows;
