import useCollisionDetectionStrategy from "@/components/logbooks/LogTemplateForm/drag/useCollisionDetectionStrategy";
import type { UniqueIdentifier } from "@dnd-kit/core";
import {
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

export type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

// @note this is from the dnd-kit example
export default function useMultipleContainers({
	initialItems
}: {
	initialItems?: Items;
}) {
	const [items, setItems] = useState<Items>(
		() =>
			initialItems ?? {
				Templates: ["A1", "A2", "A3"],
				Selection: []
			}
	);
	const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[]);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const recentlyMovedToNewContainer = useRef(false);

	const { collisionDetectionStrategy } = useCollisionDetectionStrategy({
		activeId,
		items,
		recentlyMovedToNewContainer
	});

	const [clonedItems, setClonedItems] = useState<Items | null>(null);
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor)
	);
	const findContainer = (id: UniqueIdentifier) => {
		if (id in items) {
			return id;
		}

		return Object.keys(items).find((key) => items[key].includes(id));
	};

	const getIndex = (id: UniqueIdentifier) => {
		const container = findContainer(id);

		if (!container) {
			return -1;
		}

		const index = items[container].indexOf(id);

		return index;
	};

	const onDragCancel = () => {
		if (clonedItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			setItems(clonedItems);
		}

		setActiveId(null);
		setClonedItems(null);
	};

	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false;
		});
	}, [items]);

	return {
		sensors,
		collisionDetectionStrategy,
		setContainers,
		items,
		findContainer,
		setActiveId,
		setItems,
		onDragCancel,
		containers,
		activeId,
		setClonedItems,
		getIndex,
		recentlyMovedToNewContainer
	};
}
