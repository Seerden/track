import type {
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	UniqueIdentifier
} from "@dnd-kit/core";
import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";

import Container from "./container";
import { Item } from "./sortable_item";

enum CONTAINER_IDS {
	ROOT = "root",
	SECTIONS = "sections"
}

export default function DragMultipleContainers() {
	const [items, setItems] = useState<
		Record<`${CONTAINER_IDS}`, (UniqueIdentifier | null)[]>
	>({
		root: ["lifts", "notes"],
		sections: []
	});
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row"
			}}
		>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<Container id={CONTAINER_IDS.ROOT} items={items.root as string[]} />
				<Container id={CONTAINER_IDS.SECTIONS} items={items.sections as string[]} />
				<DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
			</DndContext>
		</div>
	);

	function findContainer(id: UniqueIdentifier) {
		// NOTE: from the handleDragOver handler: this means "We're at the root
		// droppable of a container" so I guess the other case means we're in a
		// nested droppable? idk
		if (id in items) return id;

		const containerNames = Object.keys(items) as (keyof typeof items)[];
		return containerNames.find((name) => items[name].includes(id));
	}

	function handleDragStart(event: DragStartEvent) {
		const { active } = event;
		const { id } = active;

		setActiveId(id);
	}

	function handleDragOver({ active, over }: DragOverEvent) {
		if (!over) return;

		const { id } = active;
		const { id: overId } = over;

		// Find the containers
		const activeContainer = findContainer(id) as keyof typeof items;
		const overContainer = findContainer(overId) as keyof typeof items;

		if (!activeContainer || !overContainer || activeContainer === overContainer) {
			return;
		}

		setItems((current) => {
			const activeItems = current[activeContainer];
			const overItems = current[overContainer];

			// Find the indexes for the items
			const activeIndex = activeItems.indexOf(id);
			const overIndex = overItems.indexOf(overId);

			let newIndex: number;
			if (overId in current) {
				// We're at the root droppable of a container
				newIndex = overItems.length + 1;
			} else {
				const isBelowOverItem =
					over &&
					active.rect.current.translated &&
					active.rect.current.translated.top > over.rect.top + over.rect.height;

				const modifier = isBelowOverItem ? 1 : 0;

				newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
			}

			return {
				...current,
				[activeContainer]: [
					...current[activeContainer].filter((item) => item !== active.id)
				],
				[overContainer]: [
					...current[overContainer].slice(0, newIndex),
					items[activeContainer][activeIndex],
					...current[overContainer].slice(newIndex)
				]
			};
		});
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) return;

		const { id } = active;
		const { id: overId } = over;

		const activeContainer = findContainer(id) as keyof typeof items;
		const overContainer = findContainer(overId) as keyof typeof items;

		if (!activeContainer || !overContainer || activeContainer !== overContainer) {
			return;
		}

		const activeIndex = items[activeContainer].indexOf(active.id);
		const overIndex = items[overContainer].indexOf(overId);

		if (activeIndex !== overIndex) {
			setItems((items) => ({
				...items,
				[overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
			}));
		}

		setActiveId(null);
	}
}
