import { offsetIfOverflowing } from "@/components/layout/Header/LogbookMenu/floating-middleware";
import {
	autoUpdate,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { useState } from "react";

export default function useFloatingActivityOverviewFilter() {
	const [open, setOpen] = useState(false);
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

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role
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
