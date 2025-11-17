import { type PropsWithChildren, useState } from "react";
import SpeedDial from "@/components/utility/SpeedDial/SpeedDial";
import modalIds, { type ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/Create.style";

type SpeedDialActionProps = {
	$color?: React.ComponentProps<typeof S.SpeedDialButton>["$color"];
	modalId: ModalId;
};

function SpeedDialAction({
	children,
	$color = "deepskyblue",
	modalId,
}: PropsWithChildren<SpeedDialActionProps>) {
	const { openModal } = useModalState();

	return (
		<S.SpeedDialButton
			$color={$color}
			onClick={(e) => {
				e.stopPropagation();
				openModal(modalId);
			}}
		>
			{children}
		</S.SpeedDialButton>
	);
}

/** Today.tsx subcomponent for the speed dial for creation of habits, tasks,
 * etc. */
export default function Create() {
	const [speedDialOpen, setSpeedDialOpen] = useState(false);

	return (
		<S.Create>
			<SpeedDial open={speedDialOpen} setOpen={setSpeedDialOpen}>
				<S.SpeedDialActions>
					<SpeedDialAction modalId={modalIds.activities.form}>
						activity
					</SpeedDialAction>
					<SpeedDialAction modalId={modalIds.activities.newTask}>
						task
					</SpeedDialAction>
					<SpeedDialAction modalId={modalIds.habits.new}>habit</SpeedDialAction>
					<SpeedDialAction modalId={modalIds.notes.new}>note</SpeedDialAction>
				</S.SpeedDialActions>
			</SpeedDial>
		</S.Create>
	);
}
