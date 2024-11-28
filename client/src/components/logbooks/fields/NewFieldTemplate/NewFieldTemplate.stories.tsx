import NewFieldTemplate from "@/components/logbooks/fields/NewFieldTemplate/NewFieldTemplate";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof NewFieldTemplate> = {
	component: NewFieldTemplate
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<div style={{ margin: "3rem" }}>
			<NewFieldTemplate {...args} />
		</div>
	);
};
