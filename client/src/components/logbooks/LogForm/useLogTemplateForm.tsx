import useMutateNewLogTemplate from "@/lib/hooks/query/logbooks/useMutateNewLogTemplate";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useRouteProps from "@/lib/hooks/useRouteProps";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useCallback, useEffect, useMemo, useState } from "react";

type LayoutSection = {
	position: number;
	item_template_id: ID;
	filter: {
		showAllItems?: Nullable<boolean>;
		item_ids?: Nullable<ID[]>;
	};
};

export default function useLogTemplateForm({ logbook_id }: { logbook_id: ID }) {
	const { mutate: submit } = useMutateNewLogTemplate();
	const { navigate } = useRouteProps();
	const [sections, setSections] = useState<LayoutSection[]>([]);
	const templateSections = sections.filter((section) => {
		return (
			(section.item_template_id && section.filter.showAllItems) ||
			section.filter.item_ids?.length
		);
	});
	const [sectionCount, setSectionCount] = useState(1);
	const { closeModal, openModal } = useModalState();

	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbook_id);

	// TODO: use the isProbablySuspended pattern I've been introducing lately, so
	// we can move to suspended skeleton states more easily later on.

	const itemTemplates = itemTemplatesData ? Object.values(itemTemplatesData.byId) : [];
	const selectionListItems = itemTemplates.map((item) => ({
		label: item.name,
		type: "template", // TODO: when we allow specific items to be selected, this will be "item" for those entries
		value: item.item_template_id
	}));
	const [logTemplate, setLogTemplate] = useState<NewLogTemplate>({
		logbook_id,
		name: "",
		layout: []
	});

	// TODO: the type defines name as nullable, but it shouldn't be.
	const isSubmittable = templateSections.length && logTemplate.name?.length;
	const showClearSectionsButton = templateSections.length > 0;

	function selectItemOrTemplate({
		index,
		type,
		item_template_id,
		item_id
	}:
		| {
				index: number;
				type: "template";
				item_template_id: ID;
				item_id?: undefined;
		  }
		| {
				index: number;
				type: "item";
				item_template_id: ID;
				item_id: ID;
		  }) {
		return setSections((current) => {
			const newSections = [...current];

			// TODO: great use-case for immer here.
			const newValue: LayoutSection =
				type === "template"
					? {
							position: index,
							item_template_id,
							filter: {
								showAllItems: true
							}
						}
					: {
							position: index,
							item_template_id,
							filter: {
								showAllItems: false,
								item_ids: [...(newSections[index].filter.item_ids ?? []), item_id]
							}
						};

			newSections[index] = newValue;

			return newSections;
		});
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLogTemplate((current) => ({ ...current, [name]: value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const newLogTemplate = { ...logTemplate, layout: templateSections };

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
					navigate(`/logbooks/${logbook_id}`);
				}
			}
		);
	}

	const maybeAddSectionRow = useCallback(() => {
		if (sectionCount >= itemTemplates.length) {
			return;
		}

		setSectionCount((current) => current + 1);
	}, [sectionCount, itemTemplates.length]);

	useEffect(() => {
		console.log({ sections });
	}, [sections]);

	// TODO: I don't like memoizing a list of elements. Extract the inner logic to a
	// component, at the very least.
	const listElements = useMemo(() => {
		return Array.from({
			length: sectionCount
		}).map((_, index) => (
			<div
				key={index}
				style={{
					position: "relative"
				}}
			>
				{/* {sections[index]?.length > 0 && (
					<PositionIndicator>{index + 1}</PositionIndicator>
				)} */}
				{selectionListItems.map((item) => (
					<li
						key={item.label}
						onClick={(e) => {
							e.preventDefault();
							selectItemOrTemplate({
								index,
								type: "template",
								item_template_id: item.value // TODO: change this when we change the shape of selectionListItems
							});
						}}
					>
						{item.label}
					</li>
				))}
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
		handleModalOpen,
		maybeAddSectionRow
	};
}
