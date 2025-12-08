import styled from "@emotion/styled";
import { motion } from "motion/react";
import { unstyledButton } from "@/lib/theme/snippets/button";

const _UnstyledButton = styled(motion.button)`
	${unstyledButton};

	cursor: pointer;
`;

function UnstyledButton(props: Parameters<typeof _UnstyledButton>[0]) {
	return <_UnstyledButton type="button" {...props} />;
}

export default UnstyledButton;
