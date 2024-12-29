import useMutateNewItem from "@/lib/hooks/query/logbooks/useMutateNewItem";
import type { NewItem } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useState } from "react";

export default function useItemSelector({
	item_template_id,
	logbook_id
}: {
	item_template_id: ID;
	logbook_id: ID;
}) {
	const [newItem, setNewItem] = useState<NewItem>({
		name: "",
		item_template_id,
		logbook_id
	});

	const { mutate } = useMutateNewItem();

	function handleNewItemChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewItem(
			produce((draft) => {
				draft.name = e.target.value;
			})
		);
	}

	function clearNewItemName() {
		setNewItem(
			produce((draft) => {
				draft.name = "";
			})
		);
	}

	const submitNewItem = useCallback(() => {
		// TODO: actually validate the new item; includes a check for uniqueness
		// of name among descendants from the given item template.
		const isValid = newItem.name.length > 0;
		if (isValid) {
			mutate({ newItem });
		}
	}, [newItem, mutate]);

	const handleNewButtonClick = useCallback(() => {
		submitNewItem();
		clearNewItemName();
	}, [submitNewItem]);

	return {
		newItem,
		handleNewItemChange,
		handleNewButtonClick
	};
}
