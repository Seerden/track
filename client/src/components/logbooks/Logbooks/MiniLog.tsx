import { createDate } from "@/lib/datetime/make-date";
import { Link as LinkButton } from "@/lib/theme/components/buttons";
import { FlatPaths } from "@/types/router.types";
import type { Log } from "@shared/types/data/logbook.types";
import { Link } from "@tanstack/react-router";
import { LucideMaximize } from "lucide-react";
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
					<Link
						to={`/logbooks/$logbookId/log/$logId` as const satisfies FlatPaths}
						params={{ logbookId: log.logbook_id, logId: log.log_id }}
					>
						<LinkButton.IconMinimal>
							<LucideMaximize size={20} color="black" />
						</LinkButton.IconMinimal>
					</Link>
				</S.Actions>
			</S.Header>
			<S.LastUpdated>
				last changed {createDate(log.created_at).fromNow()}
			</S.LastUpdated>
		</S.Card>
	);
}
