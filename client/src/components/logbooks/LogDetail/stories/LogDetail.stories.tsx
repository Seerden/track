import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import type { LogDetailProps } from "@/components/logbooks/LogDetail/LogDetail";
import LogDetail from "@/components/logbooks/LogDetail/LogDetail";
import { itemsMock } from "@/components/logbooks/LogDetail/stories/ItemSection.stories";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogDetail> = {
	component: LogDetail
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: ItemSectionProps = {
		itemTemplate: {
			name: "lift",
			created_at: new Date(),
			description: "test description",
			item_template_id: 1,
			logbook_id: 5,
			standalone: false
		},
		logbook_id: 5,
		items: itemsMock,
		log_id: 1
	};

	const mockProps: LogDetailProps = {
		logbook_id: 5,
		log: {
			name: "PPL november 28",
			created_at: new Date(),
			end_time: null,
			start_time: null,
			log_id: 1,
			log_template_id: 1,
			logbook_id: 5
		},
		sections: [mock, mock]
	};

	return <LogDetail {...args} {...mockProps} />;
};
