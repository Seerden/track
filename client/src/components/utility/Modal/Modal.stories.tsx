import Modal from "@/components/utility/Modal/Modal";
import type { ModalId } from "@/lib/modal-ids";
import type { Meta, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Modal> = {
	component: Modal
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	args: {
		//👇 The args you need here will depend on your component
		initialOpen: true,
		modalId: "test" as ModalId,
		children: <div>I'm inside a modal!</div>
	}
};
