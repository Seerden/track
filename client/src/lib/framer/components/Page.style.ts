import styled from "styled-components";
import { pageStyle } from "../../theme/snippets/page";

const Page = styled.section`
	${pageStyle};

	// TODO: we need to overflow-y in case there is a dropdown at the bottom of
	// the page that needs to be visible. Or, we make it so that dropdowns snap
	// to the bottom if they would otherwise overflow.
	overflow: visible;
`;

export default {
	Page
};
