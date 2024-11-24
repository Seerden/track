import { Action } from "@/lib/theme/components/buttons";
import type { UseFloatingOptions } from "@floating-ui/react";
import {
	flip,
	FloatingFocusManager,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { Minus, Plus } from "lucide-react";
import type { PropsWithChildren } from "react";
import S from "./style/SpeedDial.style";

type SpeedDialProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & UseFloatingOptions;

/** A speed dial is a button that triggers a floating action list, like a list
 * of action buttons, or a list of shortcuts. */
export default function SpeedDial({
	children,
	open,
	setOpen,
	...floatingOptions
}: PropsWithChildren<SpeedDialProps>) {
	const { refs, context, floatingStyles } = useFloating({
		placement: "top",
		middleware: [offset(10), flip(), shift()], // I just took this from an example in the docs
		open,
		onOpenChange: setOpen,
		...floatingOptions
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role
	]);

	return (
		<S.SpeedDialWrapper ref={refs.setReference} {...getReferenceProps()}>
			<Action.Default color="darkBlue" style={{ width: 50, height: 50 }}>
				{open ? <Minus strokeWidth={3} /> : <Plus strokeWidth={3} />}
			</Action.Default>
			{open && (
				<div>
					<FloatingFocusManager context={context} modal={false} disabled>
						<div
							ref={refs.setFloating}
							style={{ ...floatingStyles }}
							{...getFloatingProps()}
						>
							{children}
						</div>
					</FloatingFocusManager>
				</div>
			)}
		</S.SpeedDialWrapper>
	);
}
