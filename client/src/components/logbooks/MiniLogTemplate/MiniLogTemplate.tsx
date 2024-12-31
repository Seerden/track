import MiniItemTemplate from "@/components/logbooks/MiniLogTemplate/MiniItemTemplate";
import useMiniLogTemplate from "@/components/logbooks/MiniLogTemplate/useMiniLogTemplate";
import { Link } from "@/lib/theme/components/buttons";
import type { ID } from "@t/data/utility.types";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";
import { useState } from "react";
import S from "./style/MiniLogTemplate.style";

type MiniLogTemplateProps = {
	log_template_id: ID;
	logbook_id?: ID;
};

export default function MiniLogTemplate({
	log_template_id,
	logbook_id
}: MiniLogTemplateProps) {
	const { isProbablySuspended, logTemplate, itemTemplatesWithFields } =
		useMiniLogTemplate({
			log_template_id,
			logbook_id
		});

	const [expanded, setExpanded] = useState(false);

	if (isProbablySuspended || !logTemplate) {
		return null;
	}

	return (
		<S.Wrapper>
			<S.Header>
				<h2>{logTemplate.name}</h2>
				{/* TODO: we call the button Link.IconMinimal, but in this 
               case it's not a link, we just want to use the styling 
               from that button -- it should be renamed. */}
				<Link.IconMinimal onClick={() => setExpanded(!expanded)}>
					{expanded ? (
						<LucideChevronUp size={20} />
					) : (
						<LucideChevronDown size={20} />
					)}
				</Link.IconMinimal>
			</S.Header>

			<S.MiniItemTemplateList>
				{itemTemplatesWithFields.map((itemTemplate) => (
					<MiniItemTemplate
						key={itemTemplate.item_template_id}
						itemTemplate={itemTemplate}
						variant={expanded ? "expanded" : "collapsed"}
					/>
				))}
			</S.MiniItemTemplateList>
		</S.Wrapper>
	);
}
