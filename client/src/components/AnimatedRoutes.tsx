import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { useLocation, useOutlet } from "react-router";

/**
 * @see https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
 */
function AnimatedOutlet() {
	const outlet = useOutlet();
	const [outletState] = useState(outlet);

	return <>{outletState}</>;
}

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Fragment key={location.pathname}>
				<AnimatedOutlet />
			</Fragment>
		</AnimatePresence>
	);
}
