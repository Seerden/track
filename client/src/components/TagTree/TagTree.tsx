import useTagsQuery from "@/lib/query/use-tags-query";
import useTagsTreeQuery from "@/lib/query/use-tags-tree-query";
import Badge from "@/lib/theme/components/Badge";
import type { TagWithIds } from "@/types/server/tag.types";
import type { ById, ID } from "@/types/server/utility.types";
import { useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import * as S from "./TagTree.style";

type TagTreeProps = {
	orientation?: "vertical" | "horizontal";
};

export default function TagTree({ orientation = "vertical" }: TagTreeProps) {
	const { data: tagTreeData } = useTagsTreeQuery();
	const { data: tagsData } = useTagsQuery();

	if (!tagTreeData || !tagsData) return null;

	const rootTags = Object.keys(tagTreeData.tree).map((id) => tagsData.tagsById[+id]);

	if (!Object.values(tagsData.tagsById).length) return null;

	return (
		<div>
			<S.Container>
				<h1>Tag tree</h1>
				<div>
					<label>
						filter
						<input type="text" />
					</label>
				</div>
				<S.Tree $orientation={orientation}>
					{rootTags.map((tag) => (
						<Tag key={tag.tag_id} tag={tag} level={0} />
					))}
				</S.Tree>
			</S.Container>
		</div>
	);
}

type TagProps = {
	tag: TagWithIds;
	level: number;
};

function getTag(tag_id: ID, tagsById: ById<TagWithIds>) {
	return tagsById[tag_id];
}

function Tag({ tag, level }: TagProps) {
	const { data: tagsData } = useTagsQuery();
	const [collapsed, setCollapsed] = useState(false);

	if (!tagsData) {
		return null;
	}

	const children = tag.child_ids?.map((id) => getTag(id, tagsData.tagsById));

	return (
		<S.Tag $level={level}>
			<S.TagName $level={level} as={children?.length ? "label" : "span"}>
				{tag.name}
				{!!children?.length && collapsed && (
					<Badge
						height={"20px"}
						color={"indigo"}
						title={`${children.length} tags hidden`}
					>
						{/* TODO: instead of children.length, we want to get the number of descendants */}
						{children.length}
					</Badge>
				)}
				{!!children?.length && (
					<>
						<S.DropdownCheckbox
							type="checkbox"
							onChange={(e) => setCollapsed(e.target.checked)}
						/>
						{collapsed ? (
							<MdOutlineExpandMore size={18} />
						) : (
							<MdOutlineExpandLess size={18} />
						)}
					</>
				)}
			</S.TagName>

			{!!children?.length && !collapsed && (
				<S.Children>
					{children.map((child) => (
						<Tag key={child.tag_id} tag={child} level={(level ?? 0) + 1} />
					))}
				</S.Children>
			)}
		</S.Tag>
	);
}
