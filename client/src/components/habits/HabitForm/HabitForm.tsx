import Form from "@lib/theme/components/form.style";
import DateFields from "@/components/habits/HabitForm/DateField";
import OccurrenceFields from "@/components/habits/HabitForm/OccurrenceFields";
import ProgressionFields from "@/components/habits/HabitForm/ProgressionFields";
import SimpleField from "@/components/habits/HabitForm/SimpleField";
import type { UseHabitFormArgs } from "@/components/habits/HabitForm/useHabitForm";
import {
	HabitFormProvider,
	useHabitFormContext,
} from "@/components/habits/HabitForm/useHabitFormContext";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import TagSelector from "@/components/tags/TagSelector/TagSelector";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";

function InnerHabitForm({ editing = false }: UseHabitFormArgs) {
	const { handleSubmit } = useHabitFormContext();
	const title = editing ? `Edit habit` : `Start a new habit`;
	const submitText = editing ? `Save habit` : `Create habit`;

	return (
		<Form.Wrapper>
			<Form.FormTitle>{title}</Form.FormTitle>
			<Form.Form onSubmit={handleSubmit}>
				<Form.Row>
					<SimpleField name="name" label="Habit name" required />
					<SimpleField name="description" label="Description" />
				</Form.Row>

				<OccurrenceFields />
				<ProgressionFields />
				<DateFields />

				<TagSelector
					tagSelectorId={TAG_SELECTOR_IDS.DEFAULT}
					modalId={modalIds.tagSelector.habitForm}
					showNewTagButton
					title="Add tags"
				/>

				{/* TODO: disable when invalid */}
				<Buttons.Submit.Default type="submit" disabled={false}>
					{submitText}
				</Buttons.Submit.Default>
			</Form.Form>
		</Form.Wrapper>
	);
}

export default function HabitForm(props: UseHabitFormArgs) {
	return (
		// NOTE: we destructure like this to keep the union type intact, otherwise
		// typescript tries to infer the props separately, which causes a type
		// error that isn't applicable.
		<HabitFormProvider {...props}>
			{/* NOTE: _HabitForm doesn't use all the props, but we can just pass 
            them like this anyway */}
			<InnerHabitForm {...props} />
		</HabitFormProvider>
	);
}
