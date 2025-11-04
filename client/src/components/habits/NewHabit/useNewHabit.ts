import { type NewHabit, newHabitSchema } from "@shared/lib/schemas/habit";
import type { Timestamp } from "@shared/lib/schemas/timestamp";
import { hasValidUserId } from "@shared/types/data/user-id.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import { useNavigate } from "@tanstack/react-router";
import type { Dayjs } from "dayjs";
import { produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import { createDate } from "@/lib/datetime/make-date";
import { useMutateNewHabit } from "@/lib/hooks/query/habits/useMutateNewHabit";
import useAuthentication from "@/lib/hooks/useAuthentication";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";

// TODO: refactor client and server to make this implicit. The user id will
// always be added server-side for any type of data creation.
export type NewHabitWithoutUserId = Omit<NewHabit, "user_id">;

export type DateChangeHandler = ({
	value,
	field,
}: {
	value: Nullable<Timestamp>;
	field: keyof NewHabitWithoutUserId;
}) => void;

const defaultNewHabit: NewHabitWithoutUserId = {
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
};

export default function useNewHabit() {
	const { currentUser } = useAuthentication();
	const { mutate: submit } = useMutateNewHabit();
	const { selectedTagIds, resetTagSelection } = useTagSelection(
		TAG_SELECTOR_IDS.DEFAULT
	);
	const navigate = useNavigate();
	const { closeModal } = useModalState();

	useEffect(() => {
		resetTagSelection();
	}, []);

	const [habit, setHabit] = useState<NewHabitWithoutUserId>(defaultNewHabit);

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

	const handleDateChange: DateChangeHandler = ({ value, field }) => {
		if (field !== "end_timestamp" && field !== "start_timestamp") {
			throw new Error(
				"Field must be either 'start_timestamp' or 'end_timestamp'"
			);
		}

		if (value === null) {
			switch (field) {
				case "end_timestamp":
					return handleClearEndDate();
				case "start_timestamp":
					setHabit(
						produce((draft) => {
							// TODO: is this always the behavior we want?
							draft.start_timestamp = createDate(new Date());
						})
					);
			}
		} else {
			setHabit(
				produce((draft) => {
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
				})
			);
		}
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

	function handleClearEndDate(e?: React.MouseEvent<HTMLButtonElement>) {
		e?.stopPropagation();
		setHabit(
			produce((draft) => {
				draft.end_timestamp = null;
			})
		);
	}

	return {
		habit,
		maybePlural,
		onInputChange,
		handleGoalTypeChange,
		onSubmit,
		handleDateChange,
	};
}
