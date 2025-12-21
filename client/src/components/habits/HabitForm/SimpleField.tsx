import { TextInput } from "@mantine/core";
import type { NewHabit } from "@shared/lib/schemas/habit";
import { useHabitFormContext } from "@/components/habits/HabitForm/useHabitFormContext";

export default function SimpleField({
	required,
	name,
	label,
}: {
	required?: boolean;
	name: keyof NewHabit;
	label: string;
}) {
	const { onInputChange } = useHabitFormContext();

	return (
		<TextInput
			label={label}
			type="text"
			onChange={onInputChange}
			name={name}
			required={required}
		/>
	);
}
