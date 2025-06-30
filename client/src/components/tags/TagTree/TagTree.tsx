import Modal from "@/components/utility/Modal/Modal";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import Badge from "@/lib/theme/components/Badge";
import { trpc } from "@/lib/trpc";
import { byIdAsList } from "@shared/lib/map";
import type { TagWithIds } from "@shared/types/data/tag.types";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";
import { useState } from "react";
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
	const { data: tagTreeData } = useQuery(trpc.tags.tree.queryOptions());
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());

	if (!tagTreeData || !tagsData) return null;

	const rootTagIds = [...tagTreeData.byId.keys()];
	const rootTags = rootTagIds
		.map((id) => tagsData.byId.get(String(id)))
		.filter((tag) => !!tag);

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
						{rootTags.map((tag) => (
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
	return tagsById.get(String(tag_id));
}

function Tag({ tag, level }: TagProps) {
	const { data: tagsData } = useQuery(trpc.tags.all.queryOptions());
	const [collapsed, setCollapsed] = useState(false);

	if (!tagsData) {
		return null;
	}

	const children = tag.child_ids
		?.map((id) => getTag(id, tagsData.byId))
		.filter((tag) => !!tag);

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
							<LucideChevronDown size={15} />
						) : (
							<LucideChevronUp size={15} />
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
					{children.map((child) => (
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
