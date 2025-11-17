import { Link } from "@tanstack/react-router";
import { LucideCalendarDays, LucideList, LucidePlus } from "lucide-react";
import Menu from "@/components/layout/Header/Menu";
import type { FlatPaths } from "@/types/router.types";
import S from "../style/menu.style";

export default function ActivityMenu() {
	return (
		<Menu
			id="ActivityMenu"
			Target={
				<S.TriggerButton as="button" type="button">
					Activities
				</S.TriggerButton>
			}
		>
			<S.Menu>
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
							task: true,
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
		</Menu>
	);
}
