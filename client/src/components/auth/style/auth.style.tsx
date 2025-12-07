import styled from "@emotion/styled";
import { motion } from "motion/react";
import Buttons from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Wrapper = styled(motion.div)`
	justify-self: center;
	// TODO: this should be part of the page wrapper -- but first Register should
	// be put inside a page wrapper :)
	padding-top: ${spacingValue.medium};
`;

// TODO: why is there nothing like this in F?
const Fields = styled.div`
	${flex.column};
	gap: ${spacingValue.small};
`;

const ShowPassword = styled(Buttons.Unstyled)`
	max-height: max-content;
`;

// TODO -- this is adapted from NewFieldTemplate.style. Extract it.
const Column = styled.fieldset`
	${flex.column};

	gap: ${spacingValue.smaller};
	margin: 0 ${spacingValue.smallest};
	margin-top: ${spacingValue.small};
	padding: ${spacingValue.small};
	${radius.medium};

	background-color: ${(p) => p.theme.colors.background.main[2]};
	outline: 2px solid var(--bg-3-2);
	height: max-content;
`;

export default {
	Wrapper,
	Fields,
	ShowPassword,
	Column,
};
