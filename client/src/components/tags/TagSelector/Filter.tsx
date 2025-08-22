import type { FilterProps } from "@/components/tags/TagSelector/tag-selector.types";
import Input from "@/lib/theme/input";
import { LucideX } from "lucide-react";
import S from "./style/TagSelector.style";

function Filter(p: FilterProps) {
	return (
		<S.FilterWrapper>
			<Input.Filter
				onFocus={(e) => p.onFocus?.(e)}
				autoFocus={p.hasAutoFocus}
				type="text"
				placeholder="search categories"
				value={p.filter}
				onChange={p.updateFilter}
			/>
			<S.ClearFilter
				type="button"
				onClick={p.clearFilter}
				$color="themeInverted">
				<LucideX size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}

export default Filter;
