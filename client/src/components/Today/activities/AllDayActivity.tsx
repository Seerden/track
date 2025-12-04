import { Tooltip } from "@mantine/core";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { LucideHistory } from "lucide-react";
import { useRef } from "react";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import Icons from "@/lib/theme/components/icons";
import Today from "../style/Today.style";
import S from "./style/AllDayActivity.style";

function useAllDayActivity(activity: PossiblySyntheticActivity) {
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);
	const checkboxRef = useRef<HTMLLabelElement>(null);
	const putCompletion = usePutTaskCompletion(activity);

	return {
		checkboxRef,
		openDetailedItemModal,
		putCompletion,
	};
}

type AllDayActivityProps = {
	activity: PossiblySyntheticActivity;
};

export default function AllDayActivity({ activity }: AllDayActivityProps) {
	const { checkboxRef, openDetailedItemModal, putCompletion } =
		useAllDayActivity(activity);

	return (
		<S.AllDayActivity
			$completed={activity.completed ?? false}
			key={activity.activity_id}
			onClick={(e) => {
				if (checkboxRef.current?.contains(e.target as Node)) {
					return;
				}

				e.stopPropagation();
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
		>
			<Tooltip label="This activity lasts all day" position="top" withArrow>
				<Icons.InBadge>
					<LucideHistory size={15} />
				</Icons.InBadge>
			</Tooltip>

			<S.ActivityName>{activity.name}</S.ActivityName>

			{activity.is_task && (
				<Today.CheckboxWrapper ref={checkboxRef}>
					<Checkbox
						checked={activity.completed ?? false}
						onChange={putCompletion}
					/>
				</Today.CheckboxWrapper>
			)}
		</S.AllDayActivity>
	);
}
