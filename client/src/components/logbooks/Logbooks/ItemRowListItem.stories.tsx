import type { ItemRowWithEntries } from "@/components/logbooks/Logbooks/LogCard";
import { ItemRowListItem } from "@/components/logbooks/Logbooks/LogCard";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemRowListItem> = {
	component: ItemRowListItem
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: ItemRowWithEntries = {
		created_at: new Date(),
		item_id: 1,
		item: {
			created_at: new Date(),
			item_id: 1,
			item_template_id: 1,
			name: "squat",
			logbook_id: 1
		},
		item_row_id: 1,
		log_id: 1,
		position: 0,
		values: [
			{
				created_at: new Date(),
				field_template_id: 1,
				field_value_id: 1,
				fieldTemplate: {
					field_template_id: 1,
					logbook_id: 1,
					item_template_id: 1,
					created_at: new Date(),
					name: "weight",
					description: null,
					value_type: "number",
					position: 0,
					required: true,
					unit: "kg"
				},
				item_row_id: 1,
				log_id: 1,
				value: 100
			},
			{
				created_at: new Date(),
				field_template_id: 1,
				field_value_id: 1,
				fieldTemplate: {
					field_template_id: 1,
					logbook_id: 1,
					item_template_id: 1,
					created_at: new Date(),
					name: "reps",
					description: null,
					value_type: "number",
					position: 1,
					required: true,
					unit: "reps"
				},
				item_row_id: 1,
				log_id: 1,
				value: 5
			}
		]
	};
	return (
		<>
			<ItemRowListItem {...args} itemRow={mock} />
			<ItemRowListItem {...args} itemRow={mock} />
		</>
	);
};
