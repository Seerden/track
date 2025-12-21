import Form from "@lib/theme/components/form.style";
import DateFields from "@/components/habits/HabitForm/DateField";
import OccurrenceFields from "@/components/habits/HabitForm/OccurrenceFields";
import ProgressionFields from "@/components/habits/HabitForm/ProgressionFields";
import SimpleField from "@/components/habits/HabitForm/SimpleField";
import {
	HabitFormProvider,
	useHabitFormContext,
} from "@/components/habits/HabitForm/useHabitFormContext";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import TagSelector from "@/components/tags/TagSelector/TagSelector";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";

export default function HabitForm() {
	const { onSubmit } = useHabitFormContext();

	return (
		<HabitFormProvider>
			<Form.Wrapper>
				<Form.FormTitle>Start a new habit</Form.FormTitle>
				<Form.Form onSubmit={onSubmit}>
					<Form.Row>
						<SimpleField name="name" label="Habit name" required />
						<SimpleField name="description" label="Description" />
					</Form.Row>

					<OccurrenceFields />
					<ProgressionFields />
					<DateFields />

					<TagSelector
						tagSelectorId={TAG_SELECTOR_IDS.DEFAULT}
						modalId={modalIds.tagSelector.newHabit}
						showNewTagButton
						title="Add tags"
					/>

					{/* TODO: disable when invalid */}
					<Buttons.Submit.Default type="submit" disabled={false}>
						Create habit
					</Buttons.Submit.Default>
				</Form.Form>
			</Form.Wrapper>
		</HabitFormProvider>
	);
}
