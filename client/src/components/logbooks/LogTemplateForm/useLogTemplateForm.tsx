import useMutateNewLogTemplate from "@/lib/hooks/query/logbooks/useMutateNewLogTemplate";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useRouteProps from "@/lib/hooks/useRouteProps";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useState } from "react";

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
	const { closeModal, openModal } = useModalState();
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbook_id);

	// TODO: use the isProbablySuspended pattern I've been introducing lately, so
	// we can move to suspended skeleton states more easily later on.

	const itemTemplates = itemTemplatesData ? Object.values(itemTemplatesData.byId) : [];
	const [logTemplate, setLogTemplate] = useState<NewLogTemplate>({
		logbook_id,
		name: "",
		layout: []
	});

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLogTemplate((current) => ({ ...current, [name]: value }));
	}

	// TODO: pending rework  of layout selection
	// function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	// 	e.preventDefault();

	// 	const newLogTemplate = { ...logTemplate, layout: templateSections };

	// 	// TODO: probably want to do some validation on newLogTemplate before
	// 	// submitting.

	// 	submit(
	// 		{
	// 			newLogTemplate
	// 		},
	// 		{
	// 			onSuccess: () => {
	// 				closeModal(modalIds.logbooks.itemTemplate.new);
	// 				closeModal(modalIds.logbooks.logTemplate.form);
	// 				navigate(`/logbooks/${logbook_id}`);
	// 			}
	// 		}
	// 	);
	// }

	// TODO: I don't like memoizing a list of elements. Extract the inner logic to a
	// component, at the very least.
	const listElements = [<div key={1}></div>];

	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalIds.logbooks.itemTemplate.new);
	}

	return {
		itemTemplates,
		listElements,
		handleInputChange,
		handleModalOpen
	};
}
