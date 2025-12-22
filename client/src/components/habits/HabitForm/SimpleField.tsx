import { TextInput } from "@mantine/core";
import { useHabitFormContext } from "@/components/habits/HabitForm/useHabitFormContext";

export default function SimpleField({
	required,
	name,
	label,
}: {
	required?: boolean;
	name: "name" | "description";
	label: string;
}) {
	const { onInputChange, habit } = useHabitFormContext();

	return (
		<TextInput
			label={label}
			onChange={onInputChange}
			name={name}
			value={habit[name] ?? ""}
			required={required}
		/>
	);
}
