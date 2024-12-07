import { font } from "@/lib/theme/font";
import styled from "styled-components";

const FieldName = styled.span`
	font-size: ${font.size["1"]};
	color: #111;
	border-bottom: 1px solid #ccc;
`;

const FieldValue = styled.span`
	font-size: ${font.size["0.93"]};
`;

const Field = styled.td`
	padding: 0 0.5rem;
`;

export default {
	Field,
	FieldName,
	FieldValue
};
