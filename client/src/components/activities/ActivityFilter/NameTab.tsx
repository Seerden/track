import {
	ClearInputButton,
	ResetButton,
	type TabProps,
} from "@/components/activities/ActivityFilter/ActivityFilter";
import { nameTypeOptions } from "@/components/activities/ActivityFilter/lib/filter-name";
import Containers from "@/lib/theme/components/container.style";
import S from "./style/ActivityFilter.style";

export default function NameTab({ filter, actions }: TabProps<"name">) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset.all} />
			<Containers.Row>
				<S.InputWithSelect style={{ position: "relative" }}>
					<S.Select onChange={actions.set.type}>
						{/* TODO: use a mantine select with ComboboxItems,
                      so we can rename the values for UX purposes. */}
						{nameTypeOptions.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</S.Select>
					<S.Input
						type="text"
						onChange={actions.set.value}
						value={filter.name.value ?? ""}
					/>
					{(filter.name.value?.length ?? 0 > 0) && (
						<ClearInputButton onClick={actions.reset.value} />
					)}
				</S.InputWithSelect>
			</Containers.Row>
		</S.Section>
	);
}
