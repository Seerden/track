import NewItemTemplate from "@/components/logbooks/fields/NewItemTemplate/NewItemTemplate";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof NewItemTemplate> = {
	component: NewItemTemplate
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<div style={{ margin: "3rem" }}>
			<NewItemTemplate {...args} logbook_id={1} />
		</div>
	);
};
