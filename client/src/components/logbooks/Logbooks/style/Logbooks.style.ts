import { Action } from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "styled-components";

const Wrapper = styled.div`
	${flex.column}
	justify-self: center;
	width: 75vw;

	border-left: 2px solid #666;
	border-right: 2px solid #666;

	@media (max-width: 768px) {
		width: 100vw;
		border-left: none;
		border-right: none;
	}

	padding: 0 1.5rem;
	min-height: calc(100vh - 5.4rem);
`;

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

const EmptyState = styled.div`
	${flex.column};

	outline: 1px solid #fff;
	width: max-content;
	max-width: 100%;
	box-shadow:
		0.5rem 0.5rem 0 -0.2rem #555,
		0 0 0.6rem 0 #ddd;
	padding: 2rem;

	p {
		background-color: #fff;
		padding: 1rem;
		font-size: 1rem;
		max-width: 400px;
	}
`;

const CallToAction = styled(Action.WithIcon)`
	padding: 1.5rem 1rem;
	border-radius: 3px;
	color: black;

	// Regular margin
	margin-top: -0.5rem;
	margin-left: auto;
	margin-right: 4rem;

	// Small-screen margin
	@media (max-width: 768px) {
		margin: 0;
		margin-top: 1rem;
	}
`;

export default {
	Wrapper,
	Header,
	Title,
	Actions,
	LogbookCardList,
	EmptyState,
	CallToAction
};
