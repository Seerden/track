/* eslint-disable react-compiler/react-compiler */
import type { MiddlewareState } from "@floating-ui/react";
import {
	arrow,
	detectOverflow,
	FloatingArrow,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole
} from "@floating-ui/react";
import { useRef, useState } from "react";

function offsetIfOverflowing() {
	return {
		name: "offset-if-overflowing-middleware",
		async fn(state: MiddlewareState) {
			const overflow = await detectOverflow(state);
			// this middleware can come after e.g. shift(), which makes sure the
			// overflow.right === 0, hence we don't just check for > 0 below
			if (overflow.right >= 0) {
				return {
					x: state.x - 20
				};
			}
			return {};
		}
	};
}

export default function LogbookMenu() {
	const [open, setOpen] = useState(false);

	const arrowRef = useRef(null);
	const { refs, context, floatingStyles } = useFloating({
		placement: "bottom",
		middleware: [
			shift(),
			offsetIfOverflowing(),
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

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				style={{
					position: "relative",
					width: "max-content  "
				}}
			>
				Logbooks
			</button>

			{open && (
				<div
					ref={refs.setFloating}
					style={{
						width: "max-content",
						display: "flex",
						flexDirection: "column",
						marginTop: "1rem",
						marginRight: "0.5rem",
						padding: "0.5rem",
						outline: "2px solid #ccc",
						borderRadius: "5px",
						backgroundColor: "#eee",
						boxShadow: "0 0.3rem 0.2rem 0 #bbb, 0 0 0.5rem 0 #ddd",

						...floatingStyles
					}}
					{...getFloatingProps()}
				>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						fill="#bbb"
						tipRadius={1}
					/>

					<span>logbooks</span>
					<span>new logbook</span>
				</div>
			)}
		</>
	);
}
