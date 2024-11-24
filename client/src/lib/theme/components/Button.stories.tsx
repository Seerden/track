import type { ColorKey } from "@/lib/theme/colors";
import ActionButtons from "@/lib/theme/components/buttons/Action";
import CellButtons from "@/lib/theme/components/buttons/Cell";
import UnstyledButton from "@/lib/theme/components/buttons/Unstyled";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Power, RollerCoaster } from "lucide-react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof UnstyledButton> = {
	component: UnstyledButton
};

export default meta;
type Story = StoryObj<typeof UnstyledButton>;

export const Unstyled: Story = {
	args: {
		//👇 The args you need here will depend on your component
		children: <>I'm an unstyled Button</>
	}
};

export const Edit: StoryFn = (args) => {
	return (
		<ActionButtons.Stylized {...args} $color="themeInverted">
			<RollerCoaster strokeWidth={1} />
		</ActionButtons.Stylized>
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
