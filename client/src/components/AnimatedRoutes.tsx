import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
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

const theme = createTheme(DEFAULT_THEME);

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<MantineProvider theme={theme}>
			<AnimatePresence mode="wait">
				<Fragment key={location.pathname}>
					<AnimatedOutlet />
				</Fragment>
			</AnimatePresence>
		</MantineProvider>
	);
}
