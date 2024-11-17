import type { SelectionProps } from "@/components/tags/TagSelector/tag-selector.types";
import { makePath } from "@/lib/tag-path";
import type { TagWithIds } from "@/types/server/tag.types";
import { Fragment } from "react/jsx-runtime";
import S from "./style/TagSelector.style";

function Selection(p: SelectionProps) {
	if (!p.selectedTags.length) return null;

	function renderPath(tag: TagWithIds, tags: TagWithIds[]) {
		return (
			<S.SelectionItem key={tag.tag_id}>
				{p.fullPaths
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
			{p.selectedTags.map((tag) => renderPath(tag, p.tags))}
		</S.SelectionList>
	);
}

export default Selection;
