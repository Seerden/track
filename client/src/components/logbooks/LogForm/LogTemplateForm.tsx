import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import type { ItemValue } from "@/components/utility/selection/SelectionList/SelectionList";
import SelectionList from "@/components/utility/selection/SelectionList/SelectionList";
import { LucideText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import S from "./LogTemplateForm.style";

export default function LogTemplateForm() {
	const [sections, setSections] = useState<ItemValue[][]>([]);
	const sectionCount = sections.length;
	const itemTemplates = ["test", "lifts"] as string[];
	// const itemTemplates = [] as string[];

	useEffect(() => {
		console.log({ sections });
	}, [sections]);

	const selectionListItems = itemTemplates.map((item) => ({ label: item, value: item }));

	function handleChange(index: number, value: ItemValue[]) {
		return setSections((prev) => {
			const newSections = [...prev];
			newSections[index] = value;

			return newSections;
		});
	}

	const listElements = useMemo(() => {
		return Array.from({ length: sectionCount + 1 }).map((_, index) => (
			<SelectionList
				key={index}
				items={selectionListItems}
				onChange={(value) => handleChange(index, value)}
			/>
		));
	}, [sectionCount, setSections]);

	return (
		<>
			<h1>Create a log template</h1>

			<div
				style={{
					margin: "1rem",
					padding: "1rem 2rem",
					outline: "2px solid #fff",
					color: "#333",

					boxShadow: "0 0.3rem 0.5rem 0 #ccc"
				}}
			>
				The sections you select decide which templates are part of the log, and they
				will be shown in the order you choose here: the first item becomes the first
				section, etc.
			</div>

			<S.SelectionList>
				{itemTemplates.length > 0 && !sections.length && (
					<p>You don't have any sections yet. Add a section to get started.</p>
				)}

				{itemTemplates.length > 0 ? (
					<>{listElements}</>
				) : (
					<p>
						You don't have any item templates yet. You need at least one item
						template to get started.
						<Button $iconPosition="right" $color="blue">
							New item template <LucideText size={20} />
						</Button>
					</p>
				)}
			</S.SelectionList>
		</>
	);
}
