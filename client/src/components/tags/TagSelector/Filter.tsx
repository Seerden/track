import type { FilterProps } from "@/components/tags/TagSelector/tag-selector.types";
import FilterInput from "@/lib/theme/components/input/FilterInput.style";
import { X } from "lucide-react";
import S from "./style/TagSelector.style";

function Filter(p: FilterProps) {
	return (
		<S.FilterWrapper>
			<FilterInput
				onFocus={(e) => p.onFocus?.(e)}
				autoFocus={p.hasAutoFocus}
				type="text"
				placeholder="search categories"
				value={p.filter}
				onChange={p.updateFilter}
			/>
			<S.ClearFilter onClick={p.clearFilter} $color="themeInverted">
				<X size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}

export default Filter;
