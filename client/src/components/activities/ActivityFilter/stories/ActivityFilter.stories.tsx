import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ActivityFilter> = {
	component: ActivityFilter,
	title: "components/activities/ActivityFilter"
};

export default meta;

export const Default: StoryFn = (args) => {
	function onChange(filter) {
		console.log({ filter });
	}
	return <ActivityFilter {...args} onChange={onChange} />;
};
