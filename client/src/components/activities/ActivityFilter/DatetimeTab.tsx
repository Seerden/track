import { DateTimePicker } from "@mantine/dates";
import {
	ResetButton,
	type TabProps,
} from "@/components/activities/ActivityFilter/ActivityFilter";
import {
	datetimeFilterModifiers,
	datetimeFilterSelectors,
} from "@/components/activities/ActivityFilter/lib/constants";
import Containers from "@/lib/theme/components/container.style";
import Input from "@/lib/theme/input";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/ActivityFilter.style";

export default function DatetimeTab({ filter, actions }: TabProps<"datetime">) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset} />
			<Containers.Row gap="small" style={{ marginTop: spacingValue.small }}>
				<Containers.Column>
					{datetimeFilterModifiers.map((modifier) => (
						<S.Label
							key={modifier}
							$active={filter.datetime.modifier === modifier}
						>
							{modifier}
							<Input.Hidden
								name="datetime.modifier"
								type="radio"
								onChange={() => actions.set.modifier(modifier)}
							/>
						</S.Label>
					))}
				</Containers.Column>
				<Containers.Column>
					{datetimeFilterSelectors.map((selector) => (
						<S.Label
							key={selector}
							$active={filter.datetime.selector === selector}
						>
							{selector}
							<input
								style={{ width: 0 }}
								name="datetime.modifier"
								type="radio"
								onChange={() => actions.set.selector(selector)}
							/>
						</S.Label>
					))}
				</Containers.Column>
				<Containers.Column>
					<DateTimePicker
						size="sm"
						placeholder={`pick a ${filter.datetime.selector === "between" ? "start" : ""} date`}
						label={
							filter.datetime.selector === "between" ? "start" : "datetime"
						}
						value={filter.datetime.value?.[0]?.toDate()}
						onChange={(value) => actions.set.value(value, 0)}
						style={{
							width: "150px",
						}}
						maxDate={filter.datetime.value?.[1]?.toDate()}
					/>
					{filter.datetime.selector === "between" && (
						<>
							<DateTimePicker
								label="end"
								placeholder="pick an end date"
								size="sm"
								value={filter.datetime.value?.[1]?.toDate()}
								onChange={(e) => actions.set.value(e, 1)}
								minDate={filter.datetime.value?.[0]?.toDate()}
							/>
						</>
					)}
				</Containers.Column>
			</Containers.Row>
		</S.Section>
	);
}
