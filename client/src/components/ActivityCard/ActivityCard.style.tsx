import styled, { css } from "styled-components";

export const Card = styled.div`
	width: 350px;
	padding: 1.2rem 1.1rem;
	margin: 1.5rem;
	border: 2px solid #222;
	box-shadow: 0.4rem 0.4rem 0 0 #ccc;

	display: flex;
	flex-direction: column;
	gap: 0.2rem;
`;

const fieldStyle = css`
	border-radius: 2px;
	padding: 0.2rem 0.1rem;
	border: 1px solid #ccc;
	font-size: 0.9rem;
`;

export const Title = styled.h2`
	${fieldStyle};
	border: none;
	font-size: 1.3rem;
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.3rem;
`;

export const Field = styled.p`
	${fieldStyle}
`;

export const Tags = styled.div`
	padding-right: 0.3rem;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	margin-top: 0.5rem;
`;

export const Tag = styled.span`
	display: flex;
	justify-content: space-between;
	padding-left: 1rem;
	font-size: 0.88rem;
	border-left: 2px solid blueviolet;

	&:nth-of-type(2n-1) {
		background-color: #efefef;
	}
`;

export const Date = styled.p`
	font-size: 0.8rem;
	display: flex;
	align-self: flex-end;
	background-color: #eee;
	padding: 0.3rem 0.7rem;
	border-radius: 0 3px;
	box-shadow:
		3px 3px 1px 0 #aaa,
		-3px -3px 0 #ccc,
		0 0 0 3px #ddd;

	margin-bottom: -0.1rem;
	margin-top: -1.8rem;
	margin-right: -2.5rem;
`;
