import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import FilterInput from "@/lib/theme/components/input/FilterInput.style";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DefaultInput> = {
	component: DefaultInput
};

export default meta;
type Story = StoryObj<typeof DefaultInput>;

export const Default: Story = {
	args: {
		//👇 The args you need here will depend on your component
		defaultValue: "I'm an unstyled input"
	}
};

export const Filter: StoryFn = (args) => {
	return <FilterInput {...args} defaultValue={"I'm a filter input"} />;
};
