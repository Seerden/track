import PositionIndicator from "@/components/logbooks/LogForm/PositionIndicator";
import type { ItemValue } from "@/components/utility/selection/SelectionList/SelectionList";
import SelectionList from "@/components/utility/selection/SelectionList/SelectionList";
import useMutateNewLogTemplate from "@/lib/hooks/query/logbooks/useMutateNewLogTemplate";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useLogTemplateForm({ logbook_id }: { logbook_id: ID }) {
	const { mutate: submit } = useMutateNewLogTemplate();
	const { navigate } = useRouteProps();
	const [sections, setSections] = useState<ItemValue[][]>([]);
	const sectionCount = sections.length;
	const itemTemplates = ["test", "lifts"] as string[];
	const templateSections = sections.filter((section) => section.length > 0);
	const [logTemplate, setLogTemplate] = useState<NewLogTemplate>({
		logbook_id,
		name: "",
		layout: []
	});

	useEffect(() => {
		console.log({ sections });
	}, [sections]);

	const selectionListItems = itemTemplates.map((item) => ({ label: item, value: item }));

	// TODO: the type defines name as nullable, but it shouldn't be.
	const isSubmittable = templateSections.length && logTemplate.name?.length;

	function handleChange(index: number, value: ItemValue[]) {
		return setSections((prev) => {
			const newSections = [...prev];
			newSections[index] = value;

			return newSections;
		});
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLogTemplate((current) => ({ ...current, [name]: value }));
	}

	const getLayoutFromSections = useCallback(() => {
		// TODO: this assumes all the sections can only have length 1.
		return templateSections.map((section) => section[0]);
	}, [templateSections]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const newLogTemplate = { ...logTemplate, layout: getLayoutFromSections() };

		submit(
			{
				newLogTemplate
			},
			{
				onSuccess: () => {
					navigate(`/logbooks/${logbook_id}`);
				}
			}
		);
	}

	const listElements = useMemo(() => {
		return Array.from({ length: sectionCount + 1 }).map((_, index) => (
			<div
				key={index}
				style={{
					position: "relative"
				}}
			>
				{sections[index]?.length > 0 && (
					<PositionIndicator>{index + 1}</PositionIndicator>
				)}
				<SelectionList
					key={index}
					items={selectionListItems}
					onChange={(value) => handleChange(index, value)}
				/>
			</div>
		));
	}, [sections, sectionCount]);

	return {
		templateSections,
		sections,
		itemTemplates,
		listElements,
		isSubmittable,
		handleInputChange,
		handleSubmit
	};
}
