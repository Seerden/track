import { createDate } from "@/lib/datetime/make-date";
import { useMutateNewHabit } from "@/lib/hooks/query/habits/useMutateNewHabit";
import useAuthentication from "@/lib/hooks/useAuthentication";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";
import type { NewHabit } from "@shared/lib/schemas/habit";
import { hasValidUserId } from "@shared/types/data/user-id.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import { useNavigate } from "@tanstack/react-router";
import type { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useNewHabit() {
	const { currentUser } = useAuthentication();
	const { mutate: submit } = useMutateNewHabit();
	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const navigate = useNavigate();
	const { closeModal } = useModalState();

	useEffect(() => {
		resetTagSelection();
	}, []);

	function parseNewHabit(habit: Partial<NewHabit>): NewHabit {
		// TODO: actually validate habit
		return habit as NewHabit;
	}

	const [habit, setHabit] = useState<Omit<NewHabit, "user_id">>({
		name: "",
		description: "",
		start_timestamp: createDate(new Date()),
		end_timestamp: null,
		frequency: 1,
		interval: 1,
		interval_unit: "day",
		goal_type: "checkbox",
		goal_unit: null,
		goal: null
	});

	const habitWithUserIdField = useMemo(() => {
		return Object.assign(habit, { user_id: currentUser?.user_id ?? null });
	}, [habit, currentUser]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!hasValidUserId(habitWithUserIdField)) return;

		submit(
			{
				habit: parseNewHabit(habitWithUserIdField),
				tagIds: selectedTagIds
			},
			{
				onSuccess: () => {
					navigate({ to: "/today" });
					closeModal(modalIds.habits.new);
				}
			}
		);
	}

	const maybePlural = useCallback(
		(s: string) => {
			return habit.interval === 1 ? s : s + "s";
		},
		[habit.interval]
	);

	/** Input change handler that can handle all fields in NewHabit.
	 * @todo is it time to generalize this so we can reuse it in other forms?
	 */
	function onInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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
				parsedValue = value as "checkbox" | "goal";
				break;
		}
		setHabit((current) => ({
			...current,
			[e.target.name]: parsedValue
		}));
	}
	return {
		habit,
		setHabit,
		maybePlural,
		onInputChange,
		onSubmit
	};
}
