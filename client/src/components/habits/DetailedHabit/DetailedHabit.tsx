import { isNullish } from "@shared/lib/is-nullish";
import type { HabitWithEntries } from "@shared/lib/schemas/habit";
import { LucidePenLine } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useDetailedHabit } from "@/components/habits/DetailedHabit/useDetailedHabit";
import HabitForm from "@/components/habits/HabitForm/HabitForm";
import Modal from "@/components/utility/Modal/Modal";
import TwoStepDelete from "@/components/utility/Modal/TwoStepDelete";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Buttons from "@/lib/theme/components/buttons";
import Card from "@/lib/theme/components/Card.style";
import { ActionBar } from "@/lib/theme/components/containers/action-bar.style";
import HabitCalendar from "../calendar/HabitCalendar";
import S from "./style/DetailedHabit.style";

type DetailedHabitProps = {
	habit: HabitWithEntries;
};

// TODO: extract functionality to a hook
export default function DetailedHabit({
	habit: existingHabit,
}: PropsWithChildren<DetailedHabitProps>) {
	const { openModal } = useModalState();
	const {
		habit,
		handleDeleteHabit,
		humanizedFrequency,
		humanizedStart,
		humanizedEnd,
		tags,
		openDetailedItemModal,
		timeWindow,
	} = useDetailedHabit(existingHabit);

	return (
		<>
			<S.DetailedHabitCard>
				<Card.Title>{habit.name}</Card.Title>

				<ActionBar.DetailModal>
					<TwoStepDelete
						disabled={isNullish(habit.habit_id)}
						title="Delete this habit?"
						handleConfirmClick={handleDeleteHabit}
						confirmLabel="Delete"
						rejectLabel="Keep"
					/>
					<Buttons.Action.Stylized
						type="button"
						title="Edit this habit"
						$color="royalblue"
						onClick={(e) => {
							e.stopPropagation();
							openModal(modalIds.habits.update);
						}}
					>
						<LucidePenLine size={20} />
					</Buttons.Action.Stylized>
				</ActionBar.DetailModal>
				<p>{habit.description}</p>
				<S.InfoFields>
					{habit.goal_type === "goal" && (
						<Card.InfoLine>
							<Card.InfoLabel>Goal</Card.InfoLabel>
							<Card.InfoValue>
								{habit.goal} {habit.goal_unit}
							</Card.InfoValue>
						</Card.InfoLine>
					)}
					<Card.InfoLine>
						<Card.InfoLabel>How often?</Card.InfoLabel>
						<Card.InfoValue>{humanizedFrequency}</Card.InfoValue>
					</Card.InfoLine>
				</S.InfoFields>
				<Card.Datetime
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<span>Tracking started {humanizedStart}</span>
					{habit.end_timestamp && <span>Tracking ends {humanizedEnd}</span>}
				</Card.Datetime>

				{tags && (
					<Card.Tags>
						{habit.tag_ids.map((id) => (
							<Card.Tag key={id} onClick={() => openDetailedItemModal(id)}>
								{/* TODO: See #176 */}
								{tags.get(id)?.name}
							</Card.Tag>
						))}
					</Card.Tags>
				)}
			</S.DetailedHabitCard>
			<HabitCalendar habit={habit} date={timeWindow.startDate} />

			{/* TODO (TRK-112) I don't have a mechanism to call openModal() and pass 
            props to the thing the modal is rendering. It would be tricky to make 
            that typesafe anyway. So, while we render DetailModals at a higher 
            level, we'll render this thing in here, because here we have access to 
            the habit that we want to pass to HabitForm. */}
			<Modal modalId={modalIds.habits.update}>
				<HabitForm editing habit={habit} />
			</Modal>
		</>
	);
}
