import { offsetIfOverflowing } from "@/components/layout/Header/LogbookMenu/floating-middleware";
import {
	autoUpdate,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { useState } from "react";

export default function useActivityOverviewFilter() {
	const [open, setOpen] = useState(true);
	const { refs, context, floatingStyles } = useFloating({
		whileElementsMounted: autoUpdate,
		placement: "bottom",
		strategy: "fixed",
		middleware: [shift(), offsetIfOverflowing()],
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
		floatingStyles,
		getFloatingProps,
		getReferenceProps,
		open,
		refs,
		setOpen
	};
}
