import Floating from "@/lib/theme/components/containers/floating.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "@emotion/styled";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;
	gap: 0.8rem;

	${flex.row};

	flex-wrap: nowrap;
`;

const FloatingWrapper = styled(Floating.Wrapper)`
	* {
		/* This makes sure the background of each Slider completion entry is
		      visible. */
		--slider-track-bg: #aaa;
	}
`;

export default { List, FloatingWrapper };
