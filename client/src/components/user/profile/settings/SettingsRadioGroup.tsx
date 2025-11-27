import { Radio } from "@mantine/core";
import type { RadioGroupOption } from "@/components/Today/BlockHeader";
import type { HabitFilter } from "@/components/Today/habits/habit-filter";
import type { TaskFilter } from "@/components/Today/tasks/task-filter";
import RadioOption from "@/components/utility/RadioOption";
import Containers from "@/lib/theme/components/container.style";

export default function SettingsRadioGroup({
	data,
	value,
	onChange,
	label,
}: {
	onChange: (value: string) => void;
	/** @todo to make this more generic, probably need to type this as a string,
	 * because that's what radio values are, anyway. */
	value: HabitFilter | TaskFilter;
	data: RadioGroupOption[];
	label: string;
}) {
	return (
		<Radio.Group aria-label={label} onChange={onChange} value={value}>
			<Containers.Row gap="small">
				{data.map((radioOption) => (
					<RadioOption
						value={radioOption.value}
						checked={value === radioOption.value}
						key={radioOption.tooltipLabel}
						tooltipLabel={radioOption.tooltipLabel}
						Icon={radioOption.Icon}
					/>
				))}
			</Containers.Row>
		</Radio.Group>
	);
}
