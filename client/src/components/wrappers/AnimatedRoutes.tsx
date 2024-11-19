import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Header from "@/components/layout/Header/Header";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Modal from "@/components/utility/Modal/Modal";
import useActivitiesQuery from "@/lib/hooks/query/activities/useActivitiesQuery";
import useHabitsQuery from "@/lib/hooks/query/habits/useHabitsQuery";
import useTagsQuery from "@/lib/hooks/query/tags/useTagsQuery";
import modalIds from "@/lib/modal-ids";
import { activeItemState } from "@/lib/state/active-item-state";
import PageWrapper from "@/lib/theme/snippets/page";
import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { useLocation, useOutlet } from "react-router";
import { useRecoilValue } from "recoil";

function DetailModals() {
	const { data: tags } = useTagsQuery();
	const { data: activities } = useActivitiesQuery();
	const { data: habits } = useHabitsQuery();

	const { tag, habit, activity } = useRecoilValue(activeItemState);

	const activeTag = tag.activeId ? tags?.byId[tag.activeId] : null;
	const activeActivity = activity.activeId ? activities?.byId[activity.activeId] : null;
	const activeHabit = habit.activeId ? habits?.byId[habit.activeId] : null;

	return (
		<>
			{!!activeActivity && (
				<Modal modalId={modalIds.detailedActivity}>
					<DetailedActivity activity={activeActivity} />
				</Modal>
			)}

			{!!activeHabit && (
				<Modal modalId={modalIds.habits.detailed}>
					<DetailedHabit habit={activeHabit} />
				</Modal>
			)}
			{!!activeTag && (
				<Modal modalId={modalIds.tags.detailed}>
					<DetailedTag tag={activeTag} />
				</Modal>
			)}
		</>
	);
}

/**
 * @see https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
 */
function AnimatedOutlet() {
	const outlet = useOutlet();
	const [outletState] = useState(outlet);

	return (
		<>
			{outletState}
			<DetailModals />
		</>
	);
}

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<>
			<Header />
			<PageWrapper>
				<AnimatePresence mode="wait">
					<Fragment key={location.pathname}>
						<AnimatedOutlet />
					</Fragment>
				</AnimatePresence>
			</PageWrapper>
		</>
	);
}
