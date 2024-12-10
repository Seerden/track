/* eslint-disable react-compiler/react-compiler */
import useRouteProps from "@/lib/hooks/useRouteProps";
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
import {
	LucideActivity,
	LucideNotebookPen,
	LucideNotebookTabs,
	LucidePin
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import S from "./style/Menu.style";

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
			<S.TriggerButton ref={refs.setReference} {...getReferenceProps()}>
				Logbooks
			</S.TriggerButton>

			{open && (
				<>
					<S.Menu
						ref={refs.setFloating}
						style={{
							...floatingStyles
						}}
						{...getFloatingProps()}
					>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							fill="#fff"
							width={20}
						/>
						<S.MenuSection>
							<S.Link to={`/logbooks`}>
								<LucideNotebookTabs /> logbooks
							</S.Link>
							<S.Link to={`/logbooks/new`}>
								<LucideNotebookPen /> new logbook
							</S.Link>
						</S.MenuSection>

						{/* These recent and pinned log(book)s are mocked because the 
                  functionality doesn't exist yet. */}
						<S.MenuSection>
							<S.MenuSectionHeader>
								<LucideActivity size={15} color="orange" /> Recent logs
							</S.MenuSectionHeader>
							<S.LinkCards style={{ listStyle: "none" }}>
								<S.LinkCard to="">Groceries 10 december</S.LinkCard>
								<S.LinkCard to="">PPL 9 december</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>

						<S.MenuSection>
							<S.MenuSectionHeader>
								<LucidePin size={15} color="orange" /> Pinned
							</S.MenuSectionHeader>
							<S.LinkCards style={{ listStyle: "none" }}>
								<S.LinkCard to="">Weightlifting</S.LinkCard>
							</S.LinkCards>
						</S.MenuSection>
					</S.Menu>
				</>
			)}
		</>
	);
}
