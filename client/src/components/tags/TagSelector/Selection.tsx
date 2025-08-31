import type { TagWithIds } from "@shared/lib/schemas/tag";
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
	if (!selectedTags.length) return null;

	function renderPath(tag: TagWithIds, tags: TagWithIds[]) {
		return (
			<S.SelectionItem key={tag.tag_id}>
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
		<S.SelectionList>
			{selectedTags.map((tag) => renderPath(tag, tags))}
		</S.SelectionList>
	);
}
