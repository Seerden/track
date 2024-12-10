import Drag from "@/components/logbooks/LogForm/drag/drag";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Drag> = {
	component: Drag
};

export default meta;

export const Default: StoryFn = (args) => {
	return <Drag {...args} />;
};
