import type { PropsWithChildren } from "react";
import { pageVariants } from "../variants/page-variants";
import S from "./Page.style";

export default function Page(props: PropsWithChildren) {
	return (
		<S.Page
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit">
			{props.children}
		</S.Page>
	);
}
