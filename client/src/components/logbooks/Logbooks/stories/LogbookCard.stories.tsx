import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import type { Meta, StoryFn } from "@storybook/react";
import type { Logbook } from "@t/data/logbook.types";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogbookCard> = {
	component: LogbookCard
};

export default meta;

export const Default: StoryFn = (args) => {
	const mock: Logbook = {
		created_at: new Date(),
		description: "My collection of scribbles and lists.",
		logbook_id: 1,
		name: "Notes and thoughts",
		user_id: 1
	};
	return <LogbookCard {...args} logbook={mock} />;
};
