import {
	type HabitWithIds,
	habitSchema,
	habitWithIdsSchema,
	newHabitSchema,
} from "@shared/lib/schemas/habit";
import type { Timestamp } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";
import type { Nullable } from "@shared/types/data/utility.types";
import { useNavigate } from "@tanstack/react-router";
import type { Dayjs } from "dayjs";
import { produce } from "immer";
import { type FormEvent, useEffect, useState } from "react";
import { getInitialHabit } from "@/components/habits/HabitForm/get-initial-habit";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import { createDate } from "@/lib/datetime/make-date";
import { useMutateNewHabit } from "@/lib/hooks/query/habits/useMutateNewHabit";
import { useMutateUpdateHabit } from "@/lib/hooks/query/habits/useMutateUpdateHabit";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";

const useNewHabitArgsSchema = z.union([
	z.object({
		editing: z.literal(true),
		habit: habitWithIdsSchema,
	}),
	z.object({
		editing: z.literal(false).optional(),
		habit: z.undefined().optional(),
	}),
]);
export type UseNewHabitArgs = z.infer<typeof useNewHabitArgsSchema>;

export default function useNewHabit({
	editing,
	habit: existingHabit,
}: UseNewHabitArgs) {
	const { mutate: mutateNewHabit } = useMutateNewHabit();
	const { mutate: mutateExistingHabit } = useMutateUpdateHabit();
	const { selectedTagIds, resetTagSelection, setTagSelectionFromList } =
		useTagSelection(TAG_SELECTOR_IDS.DEFAULT);
	const navigate = useNavigate();
	const { closeModal } = useModalState();

	useEffect(() => {
		if (editing) {
			setTagSelectionFromList(existingHabit.tag_ids);
		} else {
			resetTagSelection();
		}
	}, []);

	const [habit, setHabit] = useState(getInitialHabit(existingHabit));

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (editing) {
			handleSubmitExistingHabit();
		} else {
			handleSubmitNewHabit();
		}
	}

	function handleSubmitNewHabit() {
		const parsed = newHabitSchema.safeParse(habit);
		// TODO: notify
		if (!parsed.success) return;

		mutateNewHabit(
			{
				habit: parsed.data,
				tagIds: selectedTagIds,
			},
			{
				onSuccess: () => {
					navigate({ to: "/today" });
					closeModal(modalIds.habits.new);
				},
			}
		);
	}

	function handleSubmitExistingHabit() {
		if (!editing) return;
		// we destructure the original tag_ids out of the object, because we'll be
		// passing selectedTagIds to the update mutation. This is also why we
		// parse using habitSchema, not habitWithIdsSchema.
		const { tag_ids, ...habitFields } = habit as HabitWithIds;
		const parsed = habitSchema.safeParse(habitFields);

		// TODO: notify
		if (!parsed.success) return;

		mutateExistingHabit({
			habit: parsed.data,
			tagIds: selectedTagIds,
		});
	}

	/** Input change handler that can handle all fields in NewHabit.
	 * @todo is it time to generalize this so we can reuse it in other forms?
	 * @todo (TRK-144) consider splitting this up into multiple handlers for
	 * better type safety and readability. ignore the todo above, I don't want to
	 * generalize it. */
	function onInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const value = e.target.value;

		let parsedValue: Nullable<string | number | Dayjs> = value;
		switch (e.target.type) {
			case "number":
				parsedValue = +value;
				break;
			case "text":
				if (e.target.inputMode === "numeric") {
					parsedValue = +value;
				} else {
					parsedValue = value === "" ? null : value;
				}
				break;
			case "radio":
				// TODO TRK-231: consider a type for this union of options
				// "checkbox" | "goal", and use it in the select field as well.
				// Alternatively, leave this and wait for the schema validation to
				// fail on mutation to handle any cases where `value` is not one of
				// the allowed options.
				parsedValue = value as "checkbox" | "goal";
				break;
		}
		// using immer here would be tricky, since parsedValue has a union
		// type and inferring that it matches the given field is not worth it.
		setHabit((current) => ({
			...current,
			[e.target.name]: parsedValue,
		}));
	}

	const handleDateChange = ({
		value,
		field,
	}: {
		value: Nullable<Timestamp>;
		field: "end_timestamp" | "start_timestamp";
	}) => {
		setHabit(
			produce((draft) => {
				if (value === null) {
					if (field === "end_timestamp") {
						draft.end_timestamp = null;
					} else {
						// TODO: is this always the behavior we want?
						draft.start_timestamp = createDate(new Date());
					}
				} else {
					draft[field] = createDate(value);

					// if the start date is after the end date, clear the end date
					if (field === "start_timestamp" && draft.end_timestamp) {
						if (
							createDate(draft.start_timestamp).isAfter(
								createDate(draft.end_timestamp)
							)
						) {
							// TODO: is this the desired behavior, or is it better UX
							// to shift the end date accordingly? (requires additional
							// logic to determine how far the start date was shifted)
							draft.end_timestamp = null;
						}
					}
				}
			})
		);
	};

	function handleGoalTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
		onInputChange(e);
		setHabit(
			produce((draft) => {
				draft.goal = null;
				draft.goal_unit = null;
			})
		);
	}

	return {
		habit,
		onInputChange,
		handleGoalTypeChange,
		handleSubmit,
		handleDateChange,
	};
}
