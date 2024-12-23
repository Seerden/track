import { offsetIfOverflowing } from "@/components/layout/Header/LogbookMenu/floating-middleware";
import {
	autoUpdate,
	shift,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { useState } from "react";

/** TODO: this is basically the same as useFloatingActivityOverview, and
 * probably very similar to the hook for the create button as well. Create a
 * single floating hook that does basically what this thing does. Optionally
 * specify some parameters to pass to useFloating. */
export default function useFloatingPreview() {
	const [open, setOpen] = useState(false);
	const { refs, context, floatingStyles } = useFloating({
		whileElementsMounted: autoUpdate,
		placement: "bottom",
		strategy: "fixed",
		middleware: [shift(), offsetIfOverflowing()],
		open,
		onOpenChange: setOpen
	});

	const dismiss = useDismiss(context);
	const role = useRole(context);
	const hover = useHover(context, { restMs: 100 });

	const { getReferenceProps, getFloatingProps } = useInteractions([
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
