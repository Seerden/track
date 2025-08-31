import { type NewHabit, newHabitSchema } from "@shared/lib/schemas/habit";
import { hasValidUserId } from "@shared/types/data/user-id.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import { useNavigate } from "@tanstack/react-router";
import type { Dayjs } from "dayjs";
import { produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { tagSelectorId } from "@/components/tags/TagSelector/tag-selector-id";
import { createDate } from "@/lib/datetime/make-date";
import { useMutateNewHabit } from "@/lib/hooks/query/habits/useMutateNewHabit";
import useAuthentication from "@/lib/hooks/useAuthentication";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";

export type NewHabitWithoutUserId = Omit<NewHabit, "user_id">;

export default function useNewHabit() {
	const { currentUser } = useAuthentication();
	const { mutate: submit } = useMutateNewHabit();
	const { selectedTagIds, resetTagSelection } = useTagSelection(tagSelectorId);
	const navigate = useNavigate();
	const { closeModal } = useModalState();
	const [hasEndDate, setHasEndDate] = useState(false);

	useEffect(() => {
		resetTagSelection();
	}, []);

	const [habit, setHabit] = useState<NewHabitWithoutUserId>({
		name: "",
		description: "",
		start_timestamp: createDate(new Date()),
		end_timestamp: null,
		frequency: 1,
		interval: 1,
		interval_unit: "day",
		goal_type: "checkbox",
		goal_unit: null,
		goal: null,
	});

	// TODO: clean this up
	useEffect(() => {
		console.log({ habit });
	}, [habit]);

	const habitWithUserIdField = useMemo(() => {
		return Object.assign({}, habit, { user_id: currentUser?.user_id ?? null });
	}, [habit, currentUser]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const parsed = newHabitSchema.safeParse(habitWithUserIdField);
		// TODO: notify
		// TODO: remove hasValidUserId from here, append it on the server
		if (!parsed.success || !hasValidUserId(habitWithUserIdField)) return;

		submit(
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

	// TODO TRK-231: move this into the only field subcomponent that needs it
	const maybePlural = useCallback(
		(s: string) => {
			return habit.interval === 1 ? s : s + "s";
		},
		[habit.interval]
	);

	/** Input change handler that can handle all fields in NewHabit.
	 * @todo is it time to generalize this so we can reuse it in other forms?
	 */
	function onInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const value = e.target.value;
		let parsedValue: Nullable<string | number | Dayjs> = value;
		switch (e.target.type) {
			case "number":
				parsedValue = +value;
				break;
			case "date":
				parsedValue = createDate(value);
				break;
			case "text":
				parsedValue = value === "" ? null : value;
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

	function handleGoalTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
		onInputChange(e);
		setHabit(
			produce((draft) => {
				draft.goal = null;
				draft.goal_unit = null;
			})
		);
	}

	function handleClearEndDate(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setHasEndDate(false);
		setHabit(
			produce((draft) => {
				draft.end_timestamp = null;
			})
		);
	}

	function enableEndDate(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setHasEndDate(true);
	}

	return {
		habit,
		setHabit,
		maybePlural,
		onInputChange,
		handleGoalTypeChange,
		onSubmit,
		hasEndDate,
		handleClearEndDate,
		enableEndDate,
	};
}
