import type { ColorKey } from "@/lib/theme/colors";
import ButtonStyle from "@/lib/theme/components/Button.style";
import ActionButtons from "@/lib/theme/components/buttons/Action";
import CellButtons from "@/lib/theme/components/buttons/Cell";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Power, RollerCoaster } from "lucide-react";

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

export const Cell: StoryFn = (args) => {
	return (
		<>
			Selected
			<CellButtons.Default {...args} $selected={true}>
				31
			</CellButtons.Default>
			<br />
			Not selected
			<CellButtons.Default {...args} $selected={false}>
				31
			</CellButtons.Default>
		</>
	);
};

export const Action: StoryFn = (args) => {
	return (
		<div style={{ display: "flex", gap: "0.5rem" }}>
			{(["blue", "purple", "green", "red"] as ColorKey[]).map((color) => (
				<ActionButtons.Default {...args} color={color} key={color}>
					<Power strokeWidth={3} />
				</ActionButtons.Default>
			))}
		</div>
	);
};
