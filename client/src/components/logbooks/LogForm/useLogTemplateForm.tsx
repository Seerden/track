import PositionIndicator from "@/components/logbooks/LogForm/PositionIndicator";
import type { ItemValue } from "@/components/utility/selection/SelectionList/SelectionList";
import SelectionList from "@/components/utility/selection/SelectionList/SelectionList";
import useMutateNewLogTemplate from "@/lib/hooks/query/logbooks/useMutateNewLogTemplate";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import useRouteProps from "@/lib/hooks/useRouteProps";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { useCallback, useMemo, useState } from "react";

export default function useLogTemplateForm({ logbook_id }: { logbook_id: ID }) {
	const { mutate: submit } = useMutateNewLogTemplate();
	const { navigate } = useRouteProps();
	const [sections, setSections] = useState<ItemValue[][]>([]);
	const sectionCount = sections.length;
	const templateSections = sections.filter((section) => section.length > 0);
	const { closeModal, openModal } = useModalState();
	const [logTemplate, setLogTemplate] = useState<NewLogTemplate>({
		logbook_id,
		name: "",
		layout: []
	});
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbook_id);

	// TODO: use the isProbablySuspended pattern I've been introducing lately, so
	// we can move to suspended skeleton states more easily later on.
	const itemTemplates = byIdAsList(itemTemplatesData?.byId);
	const selectionListItems = itemTemplates.map((item) => ({
		label: item.name,
		value: item.item_template_id
	}));

	// TODO: the type defines name as nullable, but it shouldn't be.
	const isSubmittable = templateSections.length && logTemplate.name?.length;
	const showClearSectionsButton = templateSections.length > 0;

	function handleChange(index: number, value: ItemValue[]) {
		return setSections((current) => {
			const newSections = [...current];
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

		// TODO: probably want to do some validation on newLogTemplate before
		// submitting.

		submit(
			{
				newLogTemplate
			},
			{
				onSuccess: () => {
					closeModal(modalIds.logbooks.itemTemplate.new);
					closeModal(modalIds.logbooks.logTemplate.form);
					// TODO: do not navigate to this when we're on the LogForm page!
					navigate(`/logbooks/${logbook_id}`);
				}
			}
		);
	}

	// TODO: I don't like memoizing a list of elements. Extract the inner logic to a
	// component, at the very least.
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
	}, [sections, sectionCount, selectionListItems]);

	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalIds.logbooks.itemTemplate.new);
	}

	return {
		showClearSectionsButton,
		sectionCount,
		itemTemplates,
		listElements,
		isSubmittable,
		handleInputChange,
		handleSubmit,
		handleModalOpen
	};
}
