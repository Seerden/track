import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof ActivityFilter> = {
	component: ActivityFilter,
	title: "components/activities/ActivityFilter"
};

export default meta;

export const Default: StoryFn = (args) => {
	function onChange(filter: ActivityFilterWithValues) {
		console.log({ filter });
	}
	return <ActivityFilter {...args} onChange={onChange} />;
};
