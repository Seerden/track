import MarkdownEditor from "@/components/utility/Markdown/Markdown";
import type { Meta, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MarkdownEditor> = {
	component: MarkdownEditor
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const Default: Story = {
	args: {}
};
