import Button from "@/lib/theme/components/Button.style";
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
import { Plus } from "lucide-react";
import type { PropsWithChildren } from "react";

type SpeedDialProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/** A speed dial is a button that triggers a floating action list, like a list
 * of action buttons, or a list of shortcuts. */
export default function SpeedDial({
	children,
	open,
	setOpen
}: PropsWithChildren<SpeedDialProps>) {
	const { refs, context, floatingStyles } = useFloating({
		placement: "top",
		middleware: [offset(10), flip(), shift()], // I just took this from an example in the docs
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

	return (
		<div
			ref={refs.setReference}
			{...getReferenceProps()}
			style={{
				position: "relative",
				width: "max-content"
			}}
		>
			<Button.Create $size={"50px"}>
				<Plus strokeWidth={3} />
			</Button.Create>
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
		</div>
	);
}
