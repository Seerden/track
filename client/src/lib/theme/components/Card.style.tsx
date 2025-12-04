import styled from "@emotion/styled";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing } from "@/lib/theme/snippets/spacing";

const Wrapper = styled.section`
	padding-top: 1rem;
	min-width: 400px;
`;

const Title = styled.h2`
	position: relative;

	span {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	font-size: ${font.size["1.5"]};;
	line-height: 2rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	
   background-color: ${(p) => p.theme.colors.purple.main};
	color: ${(p) => p.theme.colors.light[0]};

	padding: 0.5rem 1.5rem;
	border-radius: 3px 3px 10px 3px;
	
   ${flex.row};
	justify-content: space-between;
	gap: 1rem;
	width: max-content;
	max-width: 100%;
	align-items: flex-end;
`;

const Datetime = styled.div`
	${flex.column};
	width: max-content;
	align-items: flex-end;
	font-size: ${font.size["0.82"]};;
	margin-top: 0.3rem;
	color: #888;
	margin-left: 0.3rem;
`;

const Tags = styled.ul`
	${flex.row};
	flex-wrap: wrap;
	align-self: flex-end;
	justify-content: flex-end;
	margin-top: 0.5rem;
	gap: 0.4rem;
	font-size: ${font.size["0.85"]};;
	margin-left: auto;
`;

const _Tag = styled.li`
	user-select: none;
	cursor: pointer;
	list-style: none;
	${spacing.padding.wide({ size: 0.3, ratio: 2 })};
	${radius.small};
	box-shadow: 0.3rem 0.3rem 0 -0.15rem ${(p) => p.theme.colors.blue.secondary};
	background-color: ${(p) => p.theme.colors.blue.main};
	width: max-content;
	color: azure;
	align-self: flex-end;
	justify-self: flex-end;
`;

function Tag(props: Parameters<typeof _Tag>[0]) {
	return <_Tag title="Click to show tag details" {...props} />;
}

const InfoLine = styled.p`
	margin-top: 0.4rem;
	width: max-content;

	// only applies the subgrid if there's multiple children
	&:has(* + *) {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
	}
`;

const InfoLabel = styled.span`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	font-size: ${font.size["0.9"]};;
	color: white;
	line-height: 0.92rem;
	background-color: ${(p) => p.theme.colors.purple.main};
	border-radius: 3px 0 0 3px;
	width: 110px;
`;

const InfoValue = styled.span`
	${spacing.padding.wide({ size: 0.5, ratio: 2 })};
	font-size: ${font.size["0.9"]};;
	line-height: 0.92rem;
	color: azure;
	background-color: ${(p) => p.theme.colors.purple.tertiary};
	border-radius: 0 3px 3px 0;
`;

const Card = {
	Wrapper,
	Title,
	Datetime,
	Tags,
	Tag,
	InfoLine,
	InfoLabel,
	InfoValue,
};

export default Card;
