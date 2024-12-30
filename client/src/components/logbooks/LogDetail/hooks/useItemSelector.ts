import useMutateNewItem from "@/lib/hooks/query/logbooks/useMutateNewItem";
import type { NewItem } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useState } from "react";

type UseItemSelectorArgs = {
	item_template_id: ID;
	logbook_id: ID;
};

/** Functionality hook for ItemSelector. */
export default function useItemSelector({
	item_template_id,
	logbook_id
}: UseItemSelectorArgs) {
	const [newItem, setNewItem] = useState<NewItem>({
		name: "",
		item_template_id,
		logbook_id
	});

	const { mutate } = useMutateNewItem();

	/** Input handler that updates the newItem's name. */
	function handleNewItemChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewItem(
			produce((draft) => {
				draft.name = e.target.value;
			})
		);
	}

	/** Reset the new item's name. */
	function clearNewItemName() {
		setNewItem(
			produce((draft) => {
				draft.name = "";
			})
		);
	}

	/** If the new item is valid, POST it.
	 * @todo actually validate the new item. That means we also need to check for
	 * uniqueness of the name among all descendants from the given item template.
	 */
	const submitNewItem = useCallback(() => {
		const isValid = newItem.name.length > 0;
		if (isValid) mutate({ newItem });
	}, [newItem, mutate]);

	/** Submit the new item (if valid) and clear the state. */
	function handleNewButtonClick() {
		submitNewItem();
		clearNewItemName();
	}

	return {
		newItem,
		handleNewItemChange,
		handleNewButtonClick
	};
}
