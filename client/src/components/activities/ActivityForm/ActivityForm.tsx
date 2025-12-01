import TagSelector from "@components/tags/TagSelector/TagSelector";
import { useTheme } from "@emotion/react";
import {
	Autocomplete,
	type AutocompleteProps,
	FocusTrap,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { byIdAsList } from "@shared/lib/map";
import type {
	NewActivityInput,
	PossiblySyntheticActivity,
} from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import {
	LucideCalendarClock,
	LucideDotSquare,
	LucideHexagon,
	LucideRepeat,
	LucideTags,
	LucideWaypoints,
} from "lucide-react";
import { useEffect } from "react";
import RecurrenceForm from "@/components/activities/ActivityForm/RecurrenceForm/RecurrenceForm";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import {
	activityEnd,
	activityStart,
	sortActivitiesByTime,
} from "@/lib/activity";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Form from "@/lib/theme/components/form.style";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { trpc } from "@/lib/trpc";
import DateTimePicker from "./DateTimePicker";
import useActivityForm from "./useActivityForm";
import useDateTimePicker from "./useDateTimePicker";

/** This component functions as a form to create a new activity, or to update an
 * existing one. As such, when you pass `activity` as a prop, this indicates you
 * want to edit an existing one, in which case you don't need to pass any other
 * props. */
export default function ActivityForm({
	activity: initialActivity,
	isTask: initialIsTask,
	modalId,
}: {
	isTask?: boolean;
	modalId?: ModalId;
	activity?: PossiblySyntheticActivity;
}) {
	const {
		handleSubmit,
		handleInputChange,
		setActivity,
		activity,
		isTask,
		isSequence,
		handleIsSequenceChange,
		title,
		buttonTitle,
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection,
		resetSelection,
		validActivity,
		validRecurrence,
	} = useActivityForm({
		initialIsTask,
		modalId,
		activity: initialActivity,
	});

	useEffect(() => {
		console.log({ parent_id: activity.parent_id });
	}, [activity.parent_id]);

	const { data: activities } = useQuery(trpc.activities.all.queryOptions());
	const activityParentSelectionComboboxData = sortActivitiesByTime(
		byIdAsList(activities).filter(
			(activity) => !activity.will_recur && !activity.recurrence_id
		)
	)
		.map((activity) => ({
			label: activity.name,
			// TODO: sortActivitiesByTime assumes it can return synthetic entries,
			// where we know from the data that none of the entries are synthetic, so
			// we can type-alias for now, but figure something more robust out later.
			value: activity.activity_id as string,
		}))
		.reverse();

	const theme = useTheme() as MainTheme;
	const renderParentSelectionCard: AutocompleteProps["renderOption"] = ({
		checked,
		option,
	}) => {
		const activity = activities?.get(option.value);
		if (!activity) return null;
		return (
			<Containers.Column
				gap="smallest"
				key={option.value}
				style={{
					backgroundColor: checked
						? "color-mix(in rgb, blue, currentColor 60%)"
						: "inherit",
				}}
			>
				<header>{activity.name}</header>
				<Containers.Row
					style={{
						fontSize: font.size["0.82"],
						color: theme.colors.text.main[4],
					}}
				>
					<p>
						from {activityStart(activity).fromNow()} to{" "}
						{activityEnd(activity).fromNow()}
					</p>
				</Containers.Row>
			</Containers.Column>
		);
	};

	const { handleDateChange, handleAllDayChange, allDay, dates } =
		useDateTimePicker({
			activity,
			setActivity,
		});

	return (
		<FocusTrap active>
			<Form.Wrapper style={{ width: "450px" }}>
				<Form.FormTitle>{title}</Form.FormTitle>
				<Form.Form onSubmit={handleSubmit}>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: spacingValue.medium,
							padding: spacingValue.small,
						}}
					>
						<Tooltip
							id="is-task-label"
							aria-label="Is this a task?"
							label="Is this a task?"
							withArrow
						>
							<label>
								<Checkbox
									aria-labelledby="is-task-label"
									size={23}
									name={"is_task" satisfies keyof NewActivityInput}
									checked={isTask}
									onChange={handleInputChange}
								/>
							</label>
						</Tooltip>

						<Tooltip
							id="all-day-label"
							aria-label="Does this activity last all day?"
							label="Does this activity last all day?"
							withArrow
						>
							<label>
								<Checkbox
									aria-labelledby="all-day-label"
									size={23}
									name="allDay"
									checked={allDay}
									onChange={handleAllDayChange}
									IconOn={LucideCalendarClock}
									IconOff={LucideCalendarClock}
								/>
							</label>
						</Tooltip>

						<Tooltip
							label="Is this activity part of a list?"
							aria-label="Is this activity part of a list?"
							id="is-sequence-label"
							withArrow
						>
							<label>
								<Checkbox
									aria-labelledby="is-sequence-label"
									size={23}
									name="is_sequence"
									checked={isSequence}
									onChange={handleIsSequenceChange}
									IconOn={LucideWaypoints}
									IconOff={LucideHexagon}
								/>
							</label>
						</Tooltip>

						<Tooltip
							id="is-recurring-label"
							aria-label="Is this a recurring activity?"
							label="Is this a recurring activity?"
							withArrow
						>
							<label>
								<Checkbox
									aria-labelledby="is-recurring-label"
									IconOn={LucideRepeat}
									IconOff={LucideDotSquare}
									size={23}
									checked={isRecurring}
									onChange={toggleRecurring}
								/>
							</label>
						</Tooltip>
					</div>
					<Form.Row
						style={{ position: "relative", padding: spacingValue.small }}
					>
						<TextInput
							style={{ width: "100%" }}
							label="Activity"
							name={"name" satisfies keyof NewActivityInput}
							onChange={handleInputChange}
							defaultValue={activity?.name}
							type="text"
							required
						/>
					</Form.Row>

					{isSequence && (
						<Form.Row style={{ flexDirection: "column", marginTop: "1rem" }}>
							<Form.RowTitle $inverted $inline>
								List
							</Form.RowTitle>

							<Autocomplete
								leftSection={<LucideTags size={18} />}
								clearable
								placeholder="Choose a parent activity"
								dropdownOpened
								withScrollArea={false}
								selectFirstOptionOnChange
								value={activity.parent_id ?? undefined}
								onChange={(value) =>
									setActivity(
										produce((draft) => {
											draft.parent_id = value;
										})
									)
								}
								styles={{
									root: {
										position: "relative",
										height: "max-content",
										display: "flex",
										flexDirection: "column",
									},
									dropdown: {
										position: "relative",
										left: "unset",
										top: "unset",
										height: "max-content",
										maxHeight: 250,
										overflowY: "scroll",
									},
									input: {
										position: "relative",
										height: "max-content",
									},
								}}
								w="100%"
								comboboxProps={{ withinPortal: false }}
								data={activityParentSelectionComboboxData}
								renderOption={renderParentSelectionCard}
							/>
						</Form.Row>
					)}

					<DateTimePicker
						allDay={allDay}
						dates={dates}
						handleDateChange={handleDateChange}
					/>

					{isRecurring && (
						<Form.Row>
							<RecurrenceForm
								isRecurring={isRecurring}
								recurrence={recurrence}
								intervalUnitSuffix={intervalUnitSuffix}
								resetSelection={resetSelection}
								updateRecurrence={updateRecurrence}
								setSelection={setSelection}
								validRecurrence={validRecurrence}
							/>
						</Form.Row>
					)}

					<TagSelector
						tagSelectorId={TAG_SELECTOR_IDS.DEFAULT}
						fullSize
						title="Tags"
						showNewTagButton
						modalId={modalIds.tagSelector.activityForm}
					/>
					{/* TODO: disable the button until everything is valid (activity fields, 
               recurrence fields, etc.) */}
					<Buttons.Submit.Default
						type="submit"
						disabled={!(validActivity && (validRecurrence || !isRecurring))}
					>
						{buttonTitle}
					</Buttons.Submit.Default>
				</Form.Form>
			</Form.Wrapper>
		</FocusTrap>
	);
}
