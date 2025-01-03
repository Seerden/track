import { createDate } from "@/lib/datetime/make-date";
import { Link as LinkButton } from "@/lib/theme/components/buttons";
import type { Log } from "@shared/types/data/logbook.types";
import { LucideMaximize } from "lucide-react";
import { Link } from "react-router-dom";
import S from "./style/MiniLog.style";

interface MiniLogProps {
	log: Log;
}

export default function MiniLog({ log }: MiniLogProps) {
	return (
		<S.Card>
			{/* TODO: make this look better and work */}
			<S.Header>
				<S.Title>{log.name}</S.Title>
				<S.Actions>
					<LinkButton.IconMinimal
						as={Link}
						to={`/logbooks/${log.logbook_id}/log/${log.log_id}`}
					>
						<LucideMaximize size={20} color="black" />
					</LinkButton.IconMinimal>
				</S.Actions>
			</S.Header>
			<S.LastUpdated>
				last changed {createDate(log.created_at).fromNow()}
			</S.LastUpdated>
		</S.Card>
	);
}
