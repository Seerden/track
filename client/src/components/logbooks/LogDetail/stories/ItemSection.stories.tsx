import { rowsMock } from "@/components/logbooks/Logbooks/stories/mock";
import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemSection> = {
	component: ItemSection
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: ItemSectionProps = {
		itemTemplate: {
			name: "lift",
			created_at: "2021-09-01T00:00:00Z",
			item_template_id: 1,
			logbook_id: 3,
			description: null,
			standalone: false
		},
		itemRows: rowsMock
	};
	return <ItemSection {...args} {...mock} />;
};
