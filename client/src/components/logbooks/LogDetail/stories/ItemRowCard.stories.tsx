import ItemRowCard from "@/components/logbooks/LogDetail/ItemRowCard";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemRowCard> = {
	component: ItemRowCard
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<ItemRowCard
			{...args}
			fields={[
				{
					created_at: "2021-09-01T00:00:00Z",
					name: "Temperature",
					unit: "°C",
					value: 25,
					description: null,
					field_template_id: 1,
					item_template_id: 1,
					logbook_id: 3,
					position: 0,
					required: true,
					value_type: "number"
				}
			]}
		/>
	);
};
