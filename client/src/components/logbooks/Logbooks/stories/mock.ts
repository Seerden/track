import type { ItemRowsProps } from "@/components/logbooks/LogDetail/ItemRows";

export const rowsMock: ItemRowsProps = {
	item: {
		name: "squat"
	},
	rows: [
		{
			fields: [
				{
					fieldName: "weight",
					fieldValue: 100,
					fieldValueType: "number",
					fieldUnit: "kg"
				},
				{
					fieldName: "reps",
					fieldUnit: null,
					fieldValue: 10,
					fieldValueType: "number"
				},
				{
					fieldName: "type",
					fieldValue: "warmup",
					fieldUnit: null,
					fieldValueType: "string"
				}
			]
		},
		{
			fields: [
				{
					fieldName: "weight",
					fieldValue: 100,
					fieldValueType: "number",
					fieldUnit: "kg"
				},
				{
					fieldName: "reps",
					fieldUnit: null,
					fieldValue: 10,
					fieldValueType: "number"
				},
				{
					fieldName: "type",
					fieldValue: "warmup",
					fieldUnit: null,
					fieldValueType: "string"
				}
			]
		}
	]
};
