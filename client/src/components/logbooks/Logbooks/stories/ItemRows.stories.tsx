import ItemRows from "@/components/logbooks/Logbooks/ItemRows";
import { rowsMock } from "@/components/logbooks/Logbooks/stories/mock";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemRows> = {
	component: ItemRows
};

export default meta;

export const Default: StoryFn = (args) => {
	return <ItemRows {...args} {...rowsMock} />;
};
