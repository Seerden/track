import { ErrorBoundary } from "@sentry/react";
import {
	getRouterContext,
	Outlet,
	useMatch,
	useMatches,
} from "@tanstack/react-router";
import { cloneDeep } from "lodash";
import {
	AnimatePresence,
	motion,
	useIsPresent,
	type Variants,
} from "motion/react";
import { forwardRef, useContext, useRef } from "react";
import DetailModals from "@/components/utility/Modal/DetailModals";
import PageWrapper from "@/lib/theme/snippets/page";

const pageMotionVariants: Variants = {
	initial: {
		x: -50,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: 50,
		opacity: 0,
	},
};

/**
 * @see https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
 * @see https://github.com/TanStack/router/discussions/823#discussioncomment-8535087
 */
const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
	const RouterContext = getRouterContext();
	const routerContext = useContext(RouterContext);
	const renderedContext = useRef(routerContext);
	const isPresent = useIsPresent();

	if (isPresent) {
		renderedContext.current = cloneDeep(routerContext);
	}

	return (
		<motion.div
			ref={ref}
			variants={pageMotionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{
				duration: 0.15,
				type: "tween",
				ease: "easeInOut",
			}}
		>
			<ErrorBoundary fallback={<p>An error occurred</p>}>
				<RouterContext.Provider value={renderedContext.current}>
					<Outlet />
					<DetailModals />
				</RouterContext.Provider>
			</ErrorBoundary>
		</motion.div>
	);
});

/** @see https://github.com/TanStack/router/discussions/823 */
export default function AnimatedRoutes() {
	const matches = useMatches();
	const match = useMatch({ strict: false });
	const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
	const nextMatch = matches[nextMatchIndex];

	return (
		<>
			<PageWrapper>
				<AnimatePresence mode="popLayout">
					<AnimatedOutlet key={nextMatch.id} />
				</AnimatePresence>
			</PageWrapper>
		</>
	);
}
