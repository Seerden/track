type HabitEntryToggleProps = {
	value: boolean;
	setValue: (value: boolean) => void;
};

export default function HabitEntryToggle({ value, setValue }: HabitEntryToggleProps) {
	return (
		<label>
			<input
				type="checkbox"
				checked={value}
				onChange={(e) => setValue(e.target.checked)}
			/>
		</label>
	);
}
