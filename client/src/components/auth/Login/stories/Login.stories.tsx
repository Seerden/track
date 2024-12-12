import Login from "@/components/auth/Login/Login";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Login> = {
	component: Login
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
	args: {}
};
