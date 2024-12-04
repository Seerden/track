import NewItem from "@/components/logbooks/fields/NewItem/NewItem";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof NewItem> = {
	component: NewItem
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<div style={{ margin: "3rem" }}>
			<NewItem
				{...args}
				logbook_id={5}
				itemTemplate={{
					created_at: "2021-09-01T00:00:00Z",
					item_template_id: 1,
					logbook_id: 5,
					name: "test_item",
					description: "testing",
					standalone: true
				}}
			/>
		</div>
	);
};
