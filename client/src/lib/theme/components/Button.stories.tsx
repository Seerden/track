import ButtonStyle from "@/lib/theme/components/Button.style";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { RollerCoaster } from "lucide-react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ButtonStyle.Unstyled> = {
	component: ButtonStyle.Unstyled
};

export default meta;
type Story = StoryObj<typeof ButtonStyle.Unstyled>;

export const Unstyled: Story = {
	args: {
		//👇 The args you need here will depend on your component
		children: <>I'm an unstyled Button</>
	}
};

export const Edit: StoryFn = (args) => {
	return (
		<ButtonStyle.Edit {...args}>
			<RollerCoaster strokeWidth={1} />
		</ButtonStyle.Edit>
	);
};

export const Create: StoryFn = (args) => {
	return (
		<ButtonStyle.Create {...args}>
			<RollerCoaster strokeWidth={1} />
		</ButtonStyle.Create>
	);
};
