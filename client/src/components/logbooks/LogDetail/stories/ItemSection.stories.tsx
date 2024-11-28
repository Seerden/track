import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import { rowsMock } from "@/components/logbooks/Logbooks/stories/mock";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemSection> = {
	component: ItemSection
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: ItemSectionProps = {
		itemTemplate: {
			name: "lift"
		},
		itemRows: [rowsMock, rowsMock]
	};
	return <ItemSection {...args} {...mock} />;
};
