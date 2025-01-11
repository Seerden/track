import LogForm from "@/components/logbooks/LogForm/LogForm";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof LogForm> = {
	component: LogForm,
	title: "components/logbooks/LogForm"
};

export default meta;

export const Default: StoryFn = (args) => {
	return <LogForm {...args} logbook_id={"5"} />;
};
