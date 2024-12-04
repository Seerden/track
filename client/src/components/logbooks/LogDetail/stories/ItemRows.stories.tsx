import ItemRows from "@/components/logbooks/LogDetail/ItemRows";
import { rowsMock } from "@/components/logbooks/Logbooks/stories/mock";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemRows> = {
	component: ItemRows
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<ItemRows
			{...args}
			rows={rowsMock}
			log_id={1}
			item={{
				created_at: "2021-09-01T00:00:00Z",
				name: "test1",
				item_id: 1,
				item_template_id: 1,
				logbook_id: 5
			}}
		/>
	);
};
