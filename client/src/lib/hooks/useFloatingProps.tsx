import { offsetIfOverflowing } from "@/lib/floating-middleware";
import type { Middleware, UseClickProps, UseHoverProps } from "@floating-ui/react";
import {
	arrow,
	autoUpdate,
	flip,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole
} from "@floating-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { useRef, useState } from "react";

type UseFloatingPreviewArgs = {
	click?: UseClickProps;
	hover?: UseHoverProps;
	open?: boolean;
	offset?: Middleware;
	setOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function useFloatingProps({
	click,
	hover,
	offset,
	open,
	setOpen
}: UseFloatingPreviewArgs) {
	// This local state is used as a fallback if open state isn't provided by
	// the caller.
	const [_open, _setOpen] = useState(open ?? false);

	const arrowRef = useRef(null);

	const { refs, context, floatingStyles } = useFloating({
		whileElementsMounted: autoUpdate,
		placement: "bottom",
		strategy: "fixed",
		middleware: [
			offset,
			shift(),
			flip(),

			offsetIfOverflowing(),
			// TODO: only use arrow if it's needed -- determine it through props
			arrow({
				element: arrowRef
			})
		],
		open: open ?? _open,
		onOpenChange: setOpen ?? _setOpen
	});

	const dismiss = useDismiss(context);
	const role = useRole(context);
	const _hover = useHover(context, {
		handleClose: safePolygon(),
		// this is true by default, for some reason, so have to specify it
		// manually. I think this changed in a recent version. Previously, I had
		// to pass a hover object into useInteractions to enable to hover
		// interaction.
		enabled: !!hover,
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
		open: open ?? _open,
		refs,
		setOpen: setOpen ?? _setOpen,
		context,
		arrowRef
	};
}
