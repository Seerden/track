import MiniLogTemplate from "@/components/logbooks/MiniLogTemplate/MiniLogTemplate";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof MiniLogTemplate> = {
	component: MiniLogTemplate,
	title: "components/logbooks/MiniLogTemplate"
};

export default meta;

export const Default: StoryFn = (args) => {
	return <MiniLogTemplate {...args} log_template_id={"4"} logbook_id={"5"} />;
};
