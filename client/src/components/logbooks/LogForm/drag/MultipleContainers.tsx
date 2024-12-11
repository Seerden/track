import DragItem from "@/components/logbooks/LogForm/drag/DragItem";
import SortableItem from "@/components/logbooks/LogForm/drag/DragSortableItem";
import { dropAnimation } from "@/components/logbooks/LogForm/drag/drop-animation";
import DroppableContainer from "@/components/logbooks/LogForm/drag/DroppableContainer";
import type { Items } from "@/components/logbooks/LogForm/drag/useMultipleContainers";
import useMultipleContainers from "@/components/logbooks/LogForm/drag/useMultipleContainers";
import type {
	CancelDrop,
	KeyboardCoordinateGetter,
	Modifiers,
	UniqueIdentifier
} from "@dnd-kit/core";
import { DndContext, DragOverlay, MeasuringStrategy } from "@dnd-kit/core";
import type { SortingStrategy } from "@dnd-kit/sortable";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import React from "react";
import { createPortal } from "react-dom";

interface Props {
	cancelDrop?: CancelDrop;
	columns?: number;
	coordinateGetter?: KeyboardCoordinateGetter;
	wrapperStyle?(args: { index: number }): React.CSSProperties;
	items?: Items;
	strategy?: SortingStrategy;
	modifiers?: Modifiers;
	vertical?: boolean;
}

export const defaultWrapperStyle = {
	width: "150px",
	height: "max-content"
} as const;

export function MultipleContainers({
	cancelDrop,
	columns,
	items: initialItems,
	modifiers,
	strategy = verticalListSortingStrategy,
	vertical = false
}: Props) {
	const {
		sensors,
		containers,
		items,
		activeId,
		recentlyMovedToNewContainer,
		setClonedItems,
		setItems,
		setActiveId,
		setContainers,
		findContainer,
		collisionDetectionStrategy,
		onDragCancel,
		getIndex
	} = useMultipleContainers({ initialItems });

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={collisionDetectionStrategy}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always
				}
			}}
			onDragStart={({ active }) => {
				setActiveId(active.id);
				setClonedItems(items);
			}}
			onDragOver={({ active, over }) => {
				const overId = over?.id;

				if (overId == null || active.id in items) {
					return;
				}

				const overContainer = findContainer(overId);
				const activeContainer = findContainer(active.id);

				if (!overContainer || !activeContainer) return;

				if (activeContainer !== overContainer) {
					setItems((items) => {
						const activeItems = items[activeContainer];
						const overItems = items[overContainer];
						const overIndex = overItems.indexOf(overId);
						const activeIndex = activeItems.indexOf(active.id);

						let newIndex: number;
						if (overId in items) {
							newIndex = overItems.length + 1;
						} else {
							const isBelowOverItem =
								over &&
								active.rect.current.translated &&
								active.rect.current.translated.top >
									over.rect.top + over.rect.height;

							const modifier = isBelowOverItem ? 1 : 0;

							newIndex =
								overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
						}

						recentlyMovedToNewContainer.current = true;

						return {
							...items,
							[activeContainer]: items[activeContainer].filter(
								(item) => item !== active.id
							),
							[overContainer]: [
								...items[overContainer].slice(0, newIndex),
								items[activeContainer][activeIndex],
								...items[overContainer].slice(
									newIndex,
									items[overContainer].length
								)
							]
						};
					});
				}
			}}
			onDragEnd={({ active, over }) => {
				if (active.id in items && over?.id) {
					setContainers((containers) => {
						const activeIndex = containers.indexOf(active.id);
						const overIndex = containers.indexOf(over.id);

						return arrayMove(containers, activeIndex, overIndex);
					});
				}

				const activeContainer = findContainer(active.id);

				if (!activeContainer) {
					setActiveId(null);
					return;
				}

				const overId = over?.id;

				if (overId == null) {
					setActiveId(null);
					return;
				}

				const overContainer = findContainer(overId);

				if (overContainer) {
					const activeIndex = items[activeContainer].indexOf(active.id);
					const overIndex = items[overContainer].indexOf(overId);

					if (activeIndex !== overIndex) {
						setItems((items) => ({
							...items,
							[overContainer]: arrayMove(
								items[overContainer],
								activeIndex,
								overIndex
							)
						}));
					}
				}

				setActiveId(null);
			}}
			cancelDrop={cancelDrop}
			onDragCancel={onDragCancel}
			modifiers={modifiers}
		>
			<div
				style={{
					display: "inline-grid",
					boxSizing: "border-box",
					padding: 20,
					gridAutoFlow: vertical ? "row" : "column"
				}}
			>
				<SortableContext
					items={[...containers]}
					strategy={
						vertical ? verticalListSortingStrategy : horizontalListSortingStrategy
					}
				>
					{containers.map((containerId) => (
						<DroppableContainer
							key={containerId}
							id={containerId}
							label={`Column ${containerId}`}
							columns={columns}
							items={items[containerId]}
						>
							<SortableContext items={items[containerId]} strategy={strategy}>
								{items[containerId].map((value, index) => {
									return (
										<SortableItem
											key={value}
											id={value}
											index={index}
											style={{}}
											wrapperStyle={defaultWrapperStyle}
											containerId={containerId}
											getIndex={getIndex}
										/>
									);
								})}
							</SortableContext>
						</DroppableContainer>
					))}
				</SortableContext>
			</div>
			{createPortal(
				<DragOverlay dropAnimation={dropAnimation}>
					{activeId ? renderSortableItemDragOverlay(activeId) : null}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	);

	function renderSortableItemDragOverlay(id: UniqueIdentifier) {
		return (
			<DragItem
				value={id}
				color={"red"}
				wrapperStyle={defaultWrapperStyle}
				dragOverlay
			/>
		);
	}
}
