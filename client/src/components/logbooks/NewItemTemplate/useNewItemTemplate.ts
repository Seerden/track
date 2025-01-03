import useMutateNewItemTemplate from "@/lib/hooks/query/logbooks/useMutateNewItemTemplate";
import type {
	NewFieldTemplate,
	NewItemTemplate
} from "@shared/types/data/logbook.new.types";
import type { ID } from "@shared/types/data/utility.types";
import type React from "react";
import { useState } from "react";

export default function useNewItemTemplate({ logbook_id }: { logbook_id: ID }) {
	// TODO: extract this default value to a variable
	const [itemTemplate, setItemTemplate] = useState<NewItemTemplate>({
		name: "",
		description: null,
		standalone: false,
		logbook_id
	});
	const [newFieldTemplates, setNewFieldTemplates] = useState<NewFieldTemplate[]>([]);
	const { mutate: submit } = useMutateNewItemTemplate();

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value, type, checked } = e.target;

		setItemTemplate((current) => ({
			...current,
			[name]: type === "checkbox" ? checked : value
		}));
	}

	function getFieldTemplateHandler(position: number) {
		return (value: NewFieldTemplate) =>
			setNewFieldTemplates((current) => {
				const newTemplates = [...current];
				newTemplates[position] = value;
				return newTemplates;
			});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// check if there is at least 1 field and if the itemTemplate fields are
		// filled out.
		// TODO: need actual validation
		if (newFieldTemplates.length === 0 || !itemTemplate.name) {
			return;
		}

		submit({ newItemTemplate: itemTemplate, newFieldTemplates });
	}

	return {
		handleInputChange,
		newFieldTemplates,
		getFieldTemplateHandler,
		handleSubmit,
		itemTemplate
	};
}
