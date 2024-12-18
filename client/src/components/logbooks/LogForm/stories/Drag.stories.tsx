import DragGrid from "@/components/logbooks/LogTemplateForm/drag/DragGrid";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DragGrid> = {
	component: DragGrid
};

export default meta;

export const Default: StoryFn = (args) => {
	return <DragGrid {...args} />;
};
