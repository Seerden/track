import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";
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
			const members = getTreeMembers(
				tag_id,
				tagsData?.byId ?? {},
				tagsTreeData?.byId ?? {}
			);

			if (filter.tags.exact) {
				// toggle tag_id in filter.tags.value
				setFilter((current) => ({
					...current,
					tags: {
						...current.tags,
						value: current.tags.value?.includes(tag_id)
							? current.tags.value.filter((id) => id !== tag_id)
							: [...(current.tags.value ?? []), tag_id]
					}
				}));
			} else {
				if (!members?.length) return;
				// toggle all members in filter.tags.value
				setFilter((current) => ({
					...current,
					tags: {
						...current.tags,
						value: current.tags.value?.includes(tag_id)
							? current.tags.value.filter((id) => !members?.includes(id))
							: [...(current.tags.value ?? []), ...members]
					}
				}));
			}
		},
		[filter, tagsData, tagsTreeData]
	);

	if (!tagsData || !tagsTreeData) return null;

	const tags = Object.values(tagsData.byId);
	const tree = tagsTreeData.byId;

	function setFilterName(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter((current) => ({
			...current,
			name: {
				...current.name,
				type: e.target.value as ActivityFilterWithValues["name"]["type"]
			}
		}));
	}

	// this basically already exists in build-branch.ts, so extract it from there
	function getRootTagId(tag_id: ID, tagsById: ById<TagWithIds>) {
		const tag = tagsById[tag_id];
		if (!tag) return;
		if (!tag.parent_id) return tag.tag_id;
		if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
		return;
	}

	function getTreeMembers(tag_id: ID, tagsById: ById<TagWithIds>, tagTree: typeof tree) {
		const rootTagId = getRootTagId(tag_id, tagsById);
		if (!rootTagId) return;
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
		</div>
	);
}
