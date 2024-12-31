import Modal from "@/components/utility/Modal/Modal";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import Badge from "@/lib/theme/components/Badge";
import type { TagWithIds } from "@t/data/tag.types";
import type { ByIdMap, ID } from "@t/data/utility.types";
import { useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import S from "./style/TagTree.style";

type TagTreeProps = {
	orientation?: "vertical" | "horizontal";
	modalId?: ModalId;
	initialOpen?: boolean;
};

export default function TagTree({
	orientation = "horizontal",
	modalId = modalIds.tagTree.tree,
	initialOpen = false
}: TagTreeProps) {
	const { data: tagTreeData } = useQueryTagsTree();
	const { data: tagsData } = useQueryTags();

	if (!tagTreeData || !tagsData) return null;

	const rootTagIds = Object.keys(tagTreeData.byId);
	const rootTags = rootTagIds.map((id) => tagsData.byId.get(id));

	if (!byIdAsList(tagsData.byId).length) return null;

	return (
		<Modal modalId={modalId} initialOpen={initialOpen}>
			<div>
				<S.Container>
					<h1>Tag tree</h1>
					{/* TODO: style and finish this */}
					<p>
						This is an overview of all your tags and how they relate to each other.
						Soon, you will be able to edit the hierarchy of your tags from here.
					</p>
					<S.Tree $orientation={orientation} $columnCount={rootTags.length}>
						{rootTags
							.filter((t) => !!t)
							.map((tag) => (
								<Tag key={tag.tag_id} tag={tag} level={0} />
							))}
					</S.Tree>
				</S.Container>
			</div>
		</Modal>
	);
}

type TagProps = {
	tag: TagWithIds;
	level: number;
};

// TODO: this has to exist in a utility file somewhere
function getTag(tag_id: ID, tagsById: ByIdMap<TagWithIds>) {
	return tagsById.get(tag_id);
}

function Tag({ tag, level }: TagProps) {
	const { data: tagsData } = useQueryTags();
	const [collapsed, setCollapsed] = useState(false);

	if (!tagsData) {
		return null;
	}

	const children = tag.child_ids?.map((id) => getTag(id, tagsData.byId));

	return (
		<S.Tag $level={level} layout>
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
							onChange={(e) => {
								e.stopPropagation();
								setCollapsed(e.target.checked);
							}}
						/>
						{collapsed ? (
							<MdOutlineExpandMore size={18} />
						) : (
							<MdOutlineExpandLess size={18} />
						)}
					</>
				)}
			</S.TagName>

			{!!children?.length && (
				<S.Children
					$collapsed={collapsed}
					layout
					variants={variants}
					initial="visible"
					animate={collapsed ? "hidden" : "visible"}
					transition={{
						duration: 0.05,
						ease: "easeIn"
					}}
				>
					{children
						.filter((c) => !!c)
						.map((child) => (
							<Tag key={child.tag_id} tag={child} level={(level ?? 0) + 1} />
						))}
				</S.Children>
			)}
		</S.Tag>
	);
}

const variants = {
	hidden: {
		opacity: 0,
		height: "0px",
		visibility: "hidden"
	},
	visible: {
		opacity: 1,
		height: "auto",
		visibility: "visible"
	}
} as const;
