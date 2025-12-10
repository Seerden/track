import type { TagWithIds } from "@shared/lib/schemas/tag";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { Fragment } from "react/jsx-runtime";
import { makePath } from "@/lib/tag-path";
import S from "./style/TagSelector.style";

export function Selection({
	selectedTags,
	tags,
	fullPaths,
}: {
	selectedTags: TagWithIds[];
	tags: TagWithIds[];
	fullPaths?: boolean;
}) {
	function renderPath(tag: TagWithIds, tags: TagWithIds[]) {
		return (
			<S.SelectionItem
				layout="size"
				key={tag.tag_id}
				transition={{
					type: "tween",
					duration: 0.075,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{fullPaths
					? makePath(tag, tags)
							.map((path, index) => (
								<Fragment key={index}>
									<S.PathPart $isLeaf={index === 0} key={path}>
										{path}
									</S.PathPart>
									{index !== 0 && "/"}
								</Fragment>
							))
							.reverse()
					: tag.name}
			</S.SelectionItem>
		);
	}

	return (
		<>
			{selectedTags.length > 0 && (
				<S.SelectionList style={{ overflowX: "hidden" }}>
					<LayoutGroup id="tag-selector-selection">
						<AnimatePresence mode="popLayout">
							{selectedTags.map((tag) => renderPath(tag, tags))}
						</AnimatePresence>
					</LayoutGroup>
				</S.SelectionList>
			)}
		</>
	);
}
