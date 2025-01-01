import { offsetIfOverflowing } from "@/components/layout/Header/LogbookMenu/floating-middleware";
import useRouteProps from "@/lib/hooks/useRouteProps";
import {
	arrow,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";

export default function useLogbookMenu() {
	const [open, setOpen] = useState(false);
	const { location } = useRouteProps();

	useEffect(() => {
		// reset menu state after location change
		// TODO: ideally we'd only close the menu state if the route actually
		// changes, but that logic is a bit more complex and it's not a priority
		// yet.
		setOpen(false);
	}, [location]);

	const arrowRef = useRef(null);
	const { refs, context, floatingStyles } = useFloating({
		placement: "bottom",
		middleware: [
			shift(),
			offsetIfOverflowing(),
			// eslint-disable-next-line react-compiler/react-compiler
			arrow({
				element: arrowRef
			})
		],
		open,
		onOpenChange: setOpen
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);
	const hover = useHover(context, {
		handleClose: safePolygon()
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
		hover
	]);

	return {
		arrowRef,
		context,
		floatingStyles,
		open,
		refs,
		getFloatingProps,
		getReferenceProps
	};
}
