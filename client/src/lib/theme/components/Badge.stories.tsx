import Badge from "@/lib/theme/components/Badge";
import type { Meta, StoryFn } from "@storybook/react";
import { Rocket } from "lucide-react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Badge> = {
	component: Badge
};

export default meta;

export const Default: StoryFn = (args) => {
	return (
		<Badge {...args}>
			<Rocket color="white" />
		</Badge>
	);
};
