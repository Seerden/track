import ActivityOverview from "@/components/activities/ActivityOverview/ActivityOverview";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ActivityOverview> = {
	component: ActivityOverview
};

export default meta;
type Story = StoryObj<typeof ActivityOverview>;

export const Default: Story = {
	args: {}
};
