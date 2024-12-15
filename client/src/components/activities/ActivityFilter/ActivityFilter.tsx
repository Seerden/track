import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { createDate } from "@/lib/datetime/make-date";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";
import { produce } from "immer";
import React, { useCallback, useEffect, useState } from "react";

const defaultFilter: ActivityFilterWithValues = {
	datetime: {
		modifier: "starts",
		selector: "after",
		value: null
	},
	name: {
		type: "includes",
		value: null
	},
	tags: {
		type: "includes",
		exact: true,
		value: null
	}
};

export default function ActivityFilter() {
	const { data: tagsData } = useQueryTags();
	const { data: tagsTreeData } = useQueryTagsTree();

	const [filter, setFilter] = useState<ActivityFilterWithValues>(defaultFilter);

	useEffect(() => {
		console.log({ filter });
	}, [filter]);

	const setFilterTags = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const tag_id = +e.currentTarget.value;
			const tagsById = tagsData?.byId ?? {};
			const tagsTreeById = tagsTreeData?.byId ?? {};

			setFilter(
				produce((draft) => {
					if (!draft.tags.value) draft.tags.value = [];
					const members = draft.tags.exact
						? [tag_id]
						: getTreeMembers(tag_id, tagsById, tagsTreeById);
					if (draft.tags.value.includes(tag_id)) {
						draft.tags.value = draft.tags.value.filter(
							(id) => !members.includes(id)
						);
					} else {
						draft.tags.value.push(...members);
					}
				})
			);
		},
		[filter, tagsData, tagsTreeData]
	);

	if (!tagsData || !tagsTreeData) return null;

	const tags = Object.values(tagsData.byId);
	const tree = tagsTreeData.byId;

	function setFilterName(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter(
			produce((draft) => {
				draft.name.type = e.target.value as ActivityFilterWithValues["name"]["type"];
			})
		);
	}

	function setDatetimeFilterModifier(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(
			produce((draft) => {
				const value = e.target.value;
				draft.datetime.modifier =
					value as ActivityFilterWithValues["datetime"]["modifier"];
			})
		);
	}

	function setDatetimeFilterSelector(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter(
			produce((draft) => {
				const value = e.target.value;
				draft.datetime.selector =
					value as ActivityFilterWithValues["datetime"]["selector"];
			})
		);
	}

	function setDatetimeFilterValue(
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) {
		setFilter(
			produce((draft) => {
				const value = createDate(e.target.value);
				if (!draft.datetime.value) draft.datetime.value = [];
				draft.datetime.value[index] = value;
			})
		);
	}

	// this basically already exists in build-branch.ts, so extract it from there
	function getRootTagId(tag_id: ID, tagsById: ById<TagWithIds>) {
		const tag = tagsById[tag_id];
		if (!tag) return;
		if (!tag.parent_id) return tag.tag_id;
		if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
		return;
	}

	function getTreeMembers(
		tag_id: ID,
		tagsById: ById<TagWithIds>,
		tagTree: typeof tree
	): ID[] {
		const rootTagId = getRootTagId(tag_id, tagsById);
		if (!rootTagId) return [];
		return tagTree[rootTagId].members;
	}

	return (
		<div>
			<div>
				<h3>name</h3>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<select onChange={setFilterName}>
						<option value="includes">includes</option>
						<option value="equals">equals</option>
						<option value="excludes">excludes</option>
						<option value="startsWith">starts with</option>
						<option value="endsWith">ends with</option>
					</select>
					<input type="text" />
				</div>
			</div>

			<div>
				<h3>tags</h3>
				<label>
					exact
					<input
						type="checkbox"
						name="exact"
						checked={filter.tags.exact}
						onChange={(e) => {
							setFilter((current) => ({
								...current,
								tags: {
									...current.tags,
									exact: e.target.checked
								}
							}));
						}}
					/>
				</label>
				<select
					onChange={(e) => {
						setFilter((current) => ({
							...current,
							tags: {
								...current.tags,
								type: e.target.value as ActivityFilterWithValues["tags"]["type"]
							}
						}));
					}}
				>
					<option value="include">include</option>
					<option value="exclude">exclude</option>
				</select>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "0.5rem"
					}}
				>
					{tags.map((tag) => (
						<button
							style={{
								backgroundColor: filter.tags.value?.includes(tag.tag_id)
									? "#ddd"
									: "white",
								outline: "1px solid #ccc",
								border: "none",
								padding: "0.3rem",
								borderRadius: "3px",
								cursor: "pointer"
							}}
							key={tag.tag_id}
							value={tag.tag_id}
							onClick={setFilterTags}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>

			<div>
				<h3>datetime</h3>
				<div
					style={{
						display: "flex",
						flexDirection: "row"
					}}
				>
					{/* Modifier radio inputs */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							border: "2px solid orange"
						}}
					>
						<label>
							starts
							<input
								type="radio"
								name="datetime.modifier"
								value="starts"
								onChange={setDatetimeFilterModifier}
							/>
						</label>
						<label>
							ends
							<input
								type="radio"
								name="datetime.modifier"
								value="ends"
								onChange={setDatetimeFilterModifier}
							/>
						</label>
						<label>
							occurs
							<input
								type="radio"
								name="datetime.modifier"
								value="occurs"
								onChange={setDatetimeFilterModifier}
							/>
						</label>
					</div>
					<div>
						<select onChange={setDatetimeFilterSelector}>
							<option value="before">before</option>
							<option value="after">after</option>
							<option value="between">between</option>
						</select>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column"
						}}
					>
						<input
							type="datetime-local"
							value={filter.datetime.value?.[0]?.format("YYYY-MM-DDTHH:mm")}
							onChange={(e) => setDatetimeFilterValue(e, 0)}
						/>
						{filter.datetime.selector === "between" && (
							<>
								and{" "}
								<input
									value={filter.datetime.value?.[1]?.format("YYYY-MM-DDTHH:mm")}
									type="datetime-local"
									onChange={(e) => setDatetimeFilterValue(e, 1)}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
