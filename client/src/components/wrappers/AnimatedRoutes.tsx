import { ErrorBoundary } from "@sentry/react";
import { getRouterContext, Outlet, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { Fragment, forwardRef, useContext, useRef } from "react";
import DetailModals from "@/components/utility/Modal/DetailModals";
import PageWrapper from "@/lib/theme/snippets/page";

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
		renderedContext.current = routerContext;
	}

	return (
		<motion.div ref={ref}>
			<ErrorBoundary fallback={<p>An error occurred</p>}>
				<RouterContext.Provider value={renderedContext.current}>
					<Outlet />
					<DetailModals />
				</RouterContext.Provider>
			</ErrorBoundary>
		</motion.div>
	);
});

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<>
			<PageWrapper>
				<AnimatePresence mode="wait">
					<Fragment key={location.pathname}>
						<AnimatedOutlet />
					</Fragment>
				</AnimatePresence>
			</PageWrapper>
		</>
	);
}
