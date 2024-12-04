import LogbookForm from "@/components/logbooks/LogbookForm/LogbookForm";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogbookForm> = {
	component: LogbookForm
};

export default meta;

export const Default: StoryFn = (args) => {
	return <LogbookForm {...args} />;
};
