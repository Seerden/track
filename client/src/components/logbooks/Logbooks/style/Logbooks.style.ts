import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Header = styled.div`
	${flex.row};

	@media (max-width: 380px) {
		${flex.column};
		align-items: flex-start;
	}

	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 1rem;
	border-bottom: 3px solid #ddd;
	padding: 1rem 2rem;
	margin-bottom: 2rem;
`;

const Title = styled.h1`
	padding: 0;
	margin: 0;
`;

// extract this to an action bar styled component?
// TODO: on mobile, always render, but as a smaller size
const Actions = styled.div`
	${flex.row};
	gap: 0.5rem;
	padding: 0.5rem 2rem;

	@media (max-width: 768px) {
		padding: 0.25rem 0.6rem;
	}

	background-color: #eee;
	outline: 2px solid #fff;

	border-radius: 3px;
`;

const LogbookCardList = styled.ul`
	${flex.row};
	flex-wrap: wrap;
	list-style: none;
	gap: 1.5rem;
`;

export default {
	Header,
	Title,
	Actions,
	LogbookCardList
};
