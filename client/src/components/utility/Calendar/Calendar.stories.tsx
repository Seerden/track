import Calendar from "@/components/utility/Calendar/Calendar";
import { createDate } from "@/lib/datetime/make-date";
import type { Meta, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Calendar> = {
	component: Calendar
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
	args: {
		//👇 The args you need here will depend on your component
		initialDate: createDate(new Date()),
		onChange: () => {}
	}
};
