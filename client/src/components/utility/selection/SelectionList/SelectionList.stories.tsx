import SelectionList from "@/components/utility/selection/SelectionList/SelectionList";
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SelectionList> = {
	component: SelectionList
};

export default meta;

export const Default: StoryFn = () => {
	const mockItems = [
		{ label: "a", value: "a" },
		{ label: "b", value: "b" }
	];

	const [selection, setSelection] = useState<(string | number)[]>([]);
	const [selection2, setSelection2] = useState<(string | number)[]>([]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem"
			}}
		>
			<div>Selection: {selection.join(",")}</div>
			<h2>Multiple:</h2>
			<SelectionList items={mockItems} onChange={setSelection} multiple={true} />

			<hr />

			<div>Selection: {selection2.join(",")}</div>
			<h2>Single:</h2>
			<SelectionList items={mockItems} onChange={setSelection2} multiple={false} />
		</div>
	);
};
