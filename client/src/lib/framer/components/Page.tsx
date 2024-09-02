import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { pageVariants } from "../variants/page-variants";
import * as S from "./Page.style";

export default function Page(props: PropsWithChildren) {
	return (
		<S.Page
			as={motion.section}
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit"
		>
			{props.children}
		</S.Page>
	);
}
