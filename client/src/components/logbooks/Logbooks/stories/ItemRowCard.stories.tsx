import type { ItemRowCardProps } from "@/components/logbooks/Logbooks/ItemRowCard";
import ItemRowCard from "@/components/logbooks/Logbooks/ItemRowCard";
import type { Meta, StoryFn } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ItemRowCard> = {
	component: ItemRowCard
};

export default meta;

export const Default: StoryFn = (args) => {
	const { row }: ItemRowCardProps = {
		row: {
			fields: [
				{
					fieldName: "weight",
					fieldValue: 100,
					fieldValueType: "number",
					fieldUnit: "kg"
				},
				{
					fieldName: "reps",
					fieldUnit: null,
					fieldValue: 10,
					fieldValueType: "number"
				},
				{
					fieldName: "type",
					fieldValue: "warmup",
					fieldUnit: null,
					fieldValueType: "string"
				}
			]
		}
	};
	return <ItemRowCard {...args} row={row} />;
};
