import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import type { LogDetailProps } from "@/components/logbooks/LogDetail/LogDetail";
import LogDetail from "@/components/logbooks/LogDetail/LogDetail";
import { rowsMock } from "@/components/logbooks/Logbooks/stories/mock";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogDetail> = {
	component: LogDetail
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: ItemSectionProps = {
		itemTemplate: {
			name: "lift"
		},
		itemRows: [rowsMock, rowsMock]
	};

	const mockProps: LogDetailProps = {
		log: { name: "PPL november 28" },
		sections: [mock, mock]
	};

	return <LogDetail {...args} {...mockProps} />;
};
