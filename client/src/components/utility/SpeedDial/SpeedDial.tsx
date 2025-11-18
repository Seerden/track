import { css } from "@emotion/react";
import type { UseFloatingOptions } from "@floating-ui/react";
import {
	FloatingFocusManager,
	flip,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole,
} from "@floating-ui/react";
import { Minus as LucideMinus, Plus as LucidePlus } from "lucide-react";
import type { PropsWithChildren } from "react";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
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
		...floatingOptions,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);
	const hover = useHover(context, {
		handleClose: safePolygon(),
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
		hover,
	]);

	const Icon = open ? LucideMinus : LucidePlus;

	return (
		<S.SpeedDialWrapper ref={refs.setReference} {...getReferenceProps()}>
			<Buttons.Action.Stylized
				$color="royalblue"
				css={css`
                  width: 50px;
                  height: 50px;
                  color: ${colors.light[0]}
               `}
				style={{ width: 50, height: 50 }}
			>
				<Icon strokeWidth={3} />
			</Buttons.Action.Stylized>
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
