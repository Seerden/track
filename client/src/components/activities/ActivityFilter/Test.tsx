import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function Test({ children }: PropsWithChildren) {
	return (
		<motion.div
			layout="size"
			style={{
				padding: "1rem 2rem",
				border: "2px solid red"
			}}
			initial={{
				maxWidth: "max-content",
				minWidth: "0px"
			}}
			animate={{
				minWidth: "max-content"
			}}
		>
			<div>{children} hello there</div>
		</motion.div>
	);
}
