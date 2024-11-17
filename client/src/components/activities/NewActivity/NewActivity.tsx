import modalIds from "@/lib/modal-ids";
import N from "@/lib/theme/components/form.style";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import TagSelector from "@components/tags/TagSelector/TagSelector";
import { Checkbox } from "@lib/theme/components/Checkbox";
import { type NewActivity } from "@type/server/activity.types";
import DateTimePicker from "./DateTimePicker";
import S from "./NewActivity.style";
import useNewActivity from "./useNewActivity";

type NewActivityProps = {
	isTask?: boolean;
	modalId?: string;
};

function NewActivity({ isTask: initialIsTask, modalId }: NewActivityProps) {
	const { onInputChange, onSubmit, onDateTimeChange, isTask } = useNewActivity({
		initialIsTask,
		modalId
	});

	return (
		<N.Wrapper>
			<N.FormTitle>Create an activity</N.FormTitle>
			<N.Form onSubmit={onSubmit}>
				<N.Row name="description">
					<N.Label>
						<span>Title</span>
						<DefaultInput
							name="name"
							onChange={onInputChange}
							type="text"
							required
						/>
					</N.Label>
					{/* TODO: for now I'm removing the description field from here -- want to implement Notes for this */}
					{/* <N.Label>
						<span>Description (optional)</span>
						<input name="description" type="text" onChange={onInputChange} />
					</N.Label> */}
					<S.Task>
						<span>Task?</span>
						<input name="is_task" type="checkbox" onChange={onInputChange} />
						<Checkbox checked={isTask} />
					</S.Task>
				</N.Row>

				<N.Row>
					<DateTimePicker setState={onDateTimeChange} />
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
