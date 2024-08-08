import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";
import { Routes, useLocation } from "react-router";

export default function AnimatedRoutes(props: PropsWithChildren) {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes key={location.pathname} location={location}>
				{props.children}
			</Routes>
		</AnimatePresence>
	);
}
