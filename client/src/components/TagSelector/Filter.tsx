import type { FilterProps } from "@/components/TagSelector/tag-selector.types";
import { MdOutlineClear } from "react-icons/md";
import S from "./TagSelector.style";

function Filter(p: FilterProps) {
	return (
		<S.FilterWrapper>
			<S.Filter
				onFocus={(e) => p.onFocus?.(e)}
				autoFocus={p.hasAutoFocus}
				type="text"
				placeholder="search categories"
				value={p.filter}
				onChange={p.updateFilter}
			/>
			<S.ClearFilter onClick={p.clearFilter}>
				<MdOutlineClear size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}

export default Filter;
