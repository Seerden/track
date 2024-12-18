import LogTemplateForm from "@/components/logbooks/LogTemplateForm/LogTemplateForm";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogTemplateForm> = {
	component: LogTemplateForm
};

export default meta;

export const Default: StoryFn = (args) => <LogTemplateForm {...args} logbook_id={5} />;
