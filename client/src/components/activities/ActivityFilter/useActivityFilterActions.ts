import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import type { ActivityFilterState } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultActivityFilter } from "@/components/activities/ActivityFilter/lib/constants";
import { createDate } from "@/lib/datetime/make-date";

export default function useActivityFilterActions(
	setFilter: Dispatch<SetStateAction<ActivityFilterState>>
) {
	// TODO: maybe don't implement the functions as event handlers, just pass the
	// values to the reducer.

	function resetDatetime() {
		setFilter(
			produce((draft) => {
				draft.datetime = defaultActivityFilter.datetime;
			})
		);
	}

	function resetNameValue() {
		setFilter(
			produce((draft) => {
				draft.name.value = null;
			})
		);
	}

	function resetName() {
		setFilter(
			produce((draft) => {
				draft.name = defaultActivityFilter.name;
			})
		);
	}

	function setNameType(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter(
			produce((draft) => {
				draft.name.type = e.target.value as ActivityFilterState["name"]["type"];
			})
		);
	}

	function setNameValue(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(
			produce((draft) => {
				draft.name.value = e.target.value;
			})
		);
	}

	function setDatetimeModifier(value: string) {
		setFilter(
			produce((draft) => {
				draft.datetime.modifier =
					value as ActivityFilterState["datetime"]["modifier"];
			})
		);
	}

	function setDatetimeSelector(selector: string) {
		setFilter(
			produce((draft) => {
				draft.datetime.selector =
					selector as ActivityFilterState["datetime"]["selector"];
			})
		);
	}

	function setDatetimeValue(value: Date | null, index: number) {
		if (!value) {
			return;
		}
		setFilter(
			produce((draft) => {
				if (!draft.datetime.value) {
					draft.datetime.value = [];
				}
				draft.datetime.value[index] = createDate(value);
			})
		);
	}

	const nameActions = {
		reset: {
			all: resetName,
			value: resetNameValue,
		},
		set: {
			type: setNameType,
			value: setNameValue,
		},
	};

	const datetimeActions = {
		reset: resetDatetime,
		set: {
			modifier: setDatetimeModifier,
			selector: setDatetimeSelector,
			value: setDatetimeValue,
		},
	};

	const actions = {
		name: nameActions,
		datetime: datetimeActions,
	};

	return actions;
}

export type Actions = ReturnType<typeof useActivityFilterActions>;
