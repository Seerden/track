import useActivityMenu from "@/components/layout/Header/ActivityMenu/useActivityMenu";
import type { FlatPaths } from "@/types/router.types";
import { FloatingArrow } from "@floating-ui/react";
import { Link } from "@tanstack/react-router";
import { LucideCalendarDays, LucideList, LucidePlus } from "lucide-react";
import S from "../style/menu.style";

// eslint-disable-next-line @typescript-eslint/ban-types
type ActivityMenuProps = {};

// eslint-disable-next-line no-empty-pattern
export default function ActivityMenu({}: ActivityMenuProps) {
	const { float } = useActivityMenu();

	return (
		<>
			<S.TriggerButton ref={float.refs.setReference} {...float.getReferenceProps()}>
				Activities
			</S.TriggerButton>

			{float.open && (
				<>
					<S.Menu
						ref={float.refs.setFloating}
						style={{
							...float.floatingStyles
						}}
						{...float.getFloatingProps()}
					>
						{/* TODO: I guess we could make this shared since it's identical in all header menus. */}
						<FloatingArrow
							ref={float.arrowRef}
							context={float.context}
							fill="#fff"
							width={20}
						/>
						<S.MenuSection>
							<Link to={`/activities`} aria-label="Activities overview">
								<S.Link>
									<LucideList /> overview
								</S.Link>
							</Link>
							{/* TODO: instead of a link, thus should open a modal -- but make sure TimeWindow etc. are all defined! */}
							<Link to={`/activities/new`}>
								<S.Link>
									<LucidePlus /> new activity
								</S.Link>
							</Link>
							<Link
								to={`/activities/new`}
								search={{
									task: true
								}}
							>
								{/* TODO: use the query param to pre-set is_task */}
								<S.Link>
									<LucidePlus /> new task
								</S.Link>
							</Link>
							<Link to={`/today` satisfies FlatPaths}>
								<S.Link>
									<LucideCalendarDays /> my calendar
								</S.Link>
							</Link>
							{/* TODO: use something fancier, like a time window selector */}
						</S.MenuSection>
					</S.Menu>
				</>
			)}
		</>
	);
}
