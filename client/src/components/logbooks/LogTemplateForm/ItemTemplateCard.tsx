import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import type { ID } from "@t/data/utility.types";

export default function ItemTemplateCard({ item_template_id }: { item_template_id: ID }) {
	const { data } = useQueryItemTemplatesByLogbook(5);
	const { data: fieldsData } = useQueryFields();
	if (!data || !fieldsData) return null;

	const itemTemplateId = 1; // TODO: use item_template_id
	const itemTemplate = data.byId[+itemTemplateId];

	return <div>{itemTemplate.name}</div>;
}
