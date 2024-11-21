import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import N from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import TagSelector from "@components/tags/TagSelector/TagSelector";
import { Checkbox } from "@lib/theme/components/Checkbox";
import type { ActivityWithIds, WithDates, WithTimestamps } from "@t/data/activity.types";
import DateTimePicker from "./DateTimePicker";
import S from "./style/ActivityForm.style";
import useActivityForm from "./useActivityForm";

type ActivityFormProps = {
	isTask?: boolean;
	modalId?: ModalId;
	activity?: ActivityWithIds;
};

/** This component functions as a form to create a new activity, or to update an
 * existing one. As such, when you pass `activity` as a prop, this indicates you
 * want to edit an existing one, in which case you don't need to pass any other
 * props. */
export default function ActivityForm({
	activity,
	isTask: initialIsTask,
	modalId
}: ActivityFormProps) {
	const { onInputChange, onSubmit, onDateTimeChange, isTask } = useActivityForm({
		initialIsTask,
		modalId,
		activity
	});

	const title = activity ? "Edit activity" : "Create an activity";
	const buttonTitle = activity ? "Update activity" : "Create activity";

	return (
		<N.Wrapper>
			<N.FormTitle>{title}</N.FormTitle>
			<N.Form onSubmit={onSubmit}>
				<N.Row name="description">
					<N.Label>
						<span>Title</span>
						<DefaultInput
							name="name"
							onChange={onInputChange}
							defaultValue={activity?.name ?? ""}
							type="text"
							required
						/>
					</N.Label>
					<S.Task>
						<span>Task?</span>
						<input name="is_task" type="checkbox" onChange={onInputChange} />
						<Checkbox checked={isTask} />
					</S.Task>
				</N.Row>

				<N.Row>
					<DateTimePicker
						setState={onDateTimeChange}
						defaultValues={
							activity
								? ({
										started_at: activity.started_at,
										ended_at: activity.ended_at,
										start_date: activity.start_date,
										end_date: activity.end_date
									} as WithDates | WithTimestamps)
								: undefined
						}
					/>
				</N.Row>

				<TagSelector
					fullSize
					title="Tags"
					showNewTagButton
					modalId={modalIds.tagSelector.activityForm}
				/>

				<N.Button>{buttonTitle}</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}
