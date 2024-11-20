import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import N from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import TagSelector from "@components/tags/TagSelector/TagSelector";
import { Checkbox } from "@lib/theme/components/Checkbox";
import type { ActivityWithIds } from "@t/data/activity.types";
import { type NewActivity } from "@t/data/activity.types";
import DateTimePicker from "./DateTimePicker";
import S from "./style/NewActivity.style";
import useActivityForm from "./useNewActivity";

type NewActivityProps = {
	isTask?: boolean;
	modalId?: ModalId;
	activity?: ActivityWithIds;
};

function NewActivity({ activity, isTask: initialIsTask, modalId }: NewActivityProps) {
	const { onInputChange, onSubmit, onDateTimeChange, isTask } = useActivityForm({
		initialIsTask,
		modalId,
		activity
	});

	const title = activity ? "Edit activity" : "Create an activity";

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
					TODO: need to be able to reverse-engineer DateTimePicker state from
					activity datetime values
					<DateTimePicker
						setState={onDateTimeChange}
						defaultValues={{
							started_at: activity?.started_at,
							ended_at: activity?.ended_at,
							start_date: activity?.start_date,
							end_date: activity?.end_date
						}}
					/>
				</N.Row>

				<TagSelector
					fullSize
					title="Tags"
					showNewTagButton
					modalId={modalIds.tagSelector.newActivity}
				/>

				<N.Button>Create activity</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}

export default NewActivity;
