import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import N from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import TagSelector from "@components/tags/TagSelector/TagSelector";
import type { ActivityWithIds } from "@t/data/activity.types";
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
	const {
		onInputChange,
		onSubmit,
		onDateTimeChange,
		isTask,
		title,
		buttonTitle,
		defaultDateTimeValues
	} = useActivityForm({
		initialIsTask,
		modalId,
		activity
	});

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
						<Checkbox name="is_task" checked={isTask} onChange={onInputChange} />
					</S.Task>
				</N.Row>

				<N.Row>
					<DateTimePicker
						onChange={onDateTimeChange}
						defaultValues={defaultDateTimeValues}
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
