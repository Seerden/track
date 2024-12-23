import { offsetIfOverflowing } from "@/components/layout/Header/LogbookMenu/floating-middleware";
import type { UseClickProps, UseHoverProps } from "@floating-ui/react";
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

type UseFloatingPreviewArgs = {
	click?: UseClickProps;
	hover?: UseHoverProps;
};

export default function useFloatingProps({ click, hover }: UseFloatingPreviewArgs) {
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
	const _hover = useHover(context, {
		handleClose: safePolygon(),
		...hover
	});
	const _click = useClick(context, click);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		dismiss,
		role,
		...[hover ? _hover : undefined],
		...[click ? _click : undefined]
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
