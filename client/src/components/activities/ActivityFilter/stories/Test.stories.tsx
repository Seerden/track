import Test from "@/components/activities/ActivityFilter/Test";
import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Test> = {
	component: Test,
	title: "components/activities/Test"
};

export default meta;

export const Default: StoryFn = (args) => {
	const [val, setVal] = useState("hello world");
	//reverse val
	return (
		<>
			<button onClick={() => setVal(val + val.split("").reverse().join(""))}>
				click
			</button>
			<Test {...args}>{val}</Test>
		</>
	);
};
