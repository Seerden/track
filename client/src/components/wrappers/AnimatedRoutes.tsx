import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Header from "@/components/layout/Header/Header";
import DetailedTag from "@/components/tags/DetailedTag/DetailedTag";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { activeItemState } from "@/lib/state/active-item-state";
import PageWrapper from "@/lib/theme/snippets/page";
import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { useLocation, useOutlet } from "react-router";
import { useRecoilValue } from "recoil";

function DetailModals() {
	const { activity, tag, habit } = useRecoilValue(activeItemState);

	return (
		<>
			{activity.shouldShowModal && (
				<Modal modalId={modalIds.detailedActivity}>
					<DetailedActivity activity={activity.activeItem} />
				</Modal>
			)}
			{habit.shouldShowModal && (
				<Modal modalId={modalIds.habits.detailed}>
					<DetailedHabit habit={habit.activeItem} />
				</Modal>
			)}
			{tag.shouldShowModal && (
				<Modal modalId={modalIds.tags.detailed}>
					<DetailedTag tag={tag.activeItem} />
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
