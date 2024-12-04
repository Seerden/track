import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import type { Meta, StoryFn } from "@storybook/react";
import type { Item } from "@t/data/logbook.types";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemSection> = {
	component: ItemSection
};

export default meta;

export const itemsMock: Item[] = [
	{
		item_id: 1,
		item_template_id: 1,
		name: "test1",
		created_at: new Date(),
		logbook_id: 5
	}
];

export const Default: StoryFn = (args) => {
	const mock: ItemSectionProps = {
		log_id: 1,
		logbook_id: 5,
		itemTemplate: {
			name: "lift",
			created_at: "2021-09-01T00:00:00Z",
			item_template_id: 1,
			logbook_id: 5,
			description: null,
			standalone: false
		},
		items: itemsMock
	};
	return <ItemSection {...args} {...mock} />;
};
