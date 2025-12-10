import type { PropsWithChildren } from "react";
import { pageVariants } from "../variants/page-variants";
import S from "./Page.style";

export default function Page(props: PropsWithChildren) {
	return (
		<S.Page
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit"
			transition={{
				duration: 0.25,
				type: "tween",
				ease: "easeInOut",
			}}
		>
			{props.children}
		</S.Page>
	);
}
