import { Container } from "@/components/logbooks/LogForm/drag/DragContainer";
import { Item } from "@/components/logbooks/LogForm/drag/DragItem";
import useMountStatus from "@/components/logbooks/LogForm/drag/useMountStatus";
import type {
	CancelDrop,
	CollisionDetection,
	DropAnimation,
	KeyboardCoordinateGetter,
	Modifiers,
	UniqueIdentifier
} from "@dnd-kit/core";
import {
	closestCenter,
	defaultDropAnimationSideEffects,
	DndContext,
	DragOverlay,
	getFirstCollision,
	KeyboardSensor,
	MeasuringStrategy,
	MouseSensor,
	pointerWithin,
	rectIntersection,
	TouchSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import type { AnimateLayoutChanges, SortingStrategy } from "@dnd-kit/sortable";
import {
	arrayMove,
	defaultAnimateLayoutChanges,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ContainerProps = {
	children: React.ReactNode;
	columns?: number;
	label?: string;
	style?: React.CSSProperties;
	horizontal?: boolean;
	hover?: boolean;
	scrollable?: boolean;
	shadow?: boolean;
	unstyled?: boolean;
	onClick?(): void;
};

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function DroppableContainer({
	children,
	columns = 1,
	id,
	items,
	style,
	...props
}: ContainerProps & {
	id: UniqueIdentifier;
	items: UniqueIdentifier[];
	style?: React.CSSProperties;
}) {
	const { active, isDragging, over, setNodeRef, transition, transform } = useSortable({
		id,
		animateLayoutChanges
	});
	const isOverContainer = over
		? (id === over.id && active?.data.current?.type !== "container") ||
			items.includes(over.id)
		: false;

	return (
		<Container
			ref={setNodeRef}
			style={{
				...style,
				transition,
				transform: CSS.Translate.toString(transform),
				opacity: isDragging ? 0.5 : undefined
			}}
			hover={isOverContainer}
			columns={columns}
			{...props}
		>
			{children}
		</Container>
	);
}

const dropAnimation: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: "0.5"
			}
		}
	})
};

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
	adjustScale?: boolean;
	cancelDrop?: CancelDrop;
	columns?: number;
	coordinateGetter?: KeyboardCoordinateGetter;

	wrapperStyle?(args: { index: number }): React.CSSProperties;
	itemCount?: number;
	items?: Items;
	strategy?: SortingStrategy;
	modifiers?: Modifiers;
	minimal?: boolean;
	scrollable?: boolean;
	vertical?: boolean;
}

export function MultipleContainers({
	adjustScale = false,
	cancelDrop,
	columns,
	items: initialItems,
	wrapperStyle = () => ({
		width: "150px",
		height: "max-content"
	}),
	minimal = false,
	modifiers,
	strategy = verticalListSortingStrategy,
	vertical = false,
	scrollable
}: Props) {
	const [items, setItems] = useState<Items>(
		() =>
			initialItems ?? {
				Templates: ["A1", "A2", "A3"],
				Selection: []
			}
	);
	const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[]);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const lastOverId = useRef<UniqueIdentifier | null>(null);
	const recentlyMovedToNewContainer = useRef(false);

	/**
	 * Custom collision detection strategy optimized for multiple containers
	 *
	 * - First, find any droppable containers intersecting with the pointer.
	 * - If there are none, find intersecting containers with the active draggable.
	 * - If there are no intersecting containers, return the last matched intersection
	 *
	 */
	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			if (activeId && activeId in items) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(container) => container.id in items
					)
				});
			}

			// Start by finding any intersecting droppable
			const pointerIntersections = pointerWithin(args);
			const intersections =
				pointerIntersections.length > 0
					? // If there are droppables intersecting with the pointer, return those
						pointerIntersections
					: rectIntersection(args);
			let overId = getFirstCollision(intersections, "id");

			if (overId != null) {
				if (overId in items) {
					const containerItems = items[overId];

					// If a container is matched and it contains items (columns 'A', 'B', 'C')
					if (containerItems.length > 0) {
						// Return the closest droppable within that container
						overId = closestCenter({
							...args,
							droppableContainers: args.droppableContainers.filter(
								(container) =>
									container.id !== overId &&
									containerItems.includes(container.id)
							)
						})[0]?.id;
					}
				}

				lastOverId.current = overId;

				return [{ id: overId }];
			}

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId;
			}

			// If no droppable is matched, return the last match
			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[activeId, items]
	);
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

				if (!overContainer || !activeContainer) {
					return;
				}

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
							scrollable={scrollable}
							unstyled={minimal}
						>
							<SortableContext items={items[containerId]} strategy={strategy}>
								{items[containerId].map((value, index) => {
									return (
										<SortableItem
											key={value}
											id={value}
											index={index}
											style={{}}
											wrapperStyle={wrapperStyle}
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
				<DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
					{activeId
						? containers.includes(activeId)
							? renderContainerDragOverlay(activeId)
							: renderSortableItemDragOverlay(activeId)
						: null}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	);

	function renderSortableItemDragOverlay(id: UniqueIdentifier) {
		return (
			<Item
				value={id}
				color={"red"}
				wrapperStyle={wrapperStyle({ index: 0 })}
				dragOverlay
			/>
		);
	}

	function renderContainerDragOverlay(containerId: UniqueIdentifier) {
		return (
			<Container
				label={`Column ${containerId}`}
				columns={columns}
				style={{
					height: "100%"
				}}
				shadow
			>
				{items[containerId].map((item, index) => (
					<Item
						key={item}
						value={item}
						color={"red"}
						wrapperStyle={wrapperStyle({ index })}
					/>
				))}
			</Container>
		);
	}
}

interface SortableItemProps {
	containerId: UniqueIdentifier;
	id: UniqueIdentifier;
	index: number;
	style: React.CSSProperties;
	getIndex(id: UniqueIdentifier): number;
	wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function SortableItem({ id, index, wrapperStyle }: SortableItemProps) {
	const { setNodeRef, listeners, isDragging, isSorting, transform, transition } =
		useSortable({
			id
		});
	const mounted = useMountStatus();
	const mountedWhileDragging = isDragging && !mounted;

	return (
		<Item
			ref={setNodeRef}
			value={id}
			dragging={isDragging}
			sorting={isSorting}
			index={index}
			wrapperStyle={wrapperStyle({ index })}
			color={"orange"}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
		/>
	);
}
