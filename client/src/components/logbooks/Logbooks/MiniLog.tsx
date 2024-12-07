import { createDate } from "@/lib/datetime/make-date";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { Log } from "@t/data/logbook.types";
import S from "./style/MiniLog.style";

interface MiniLogProps {
	log: Log;
}

export default function MiniLog({ log }: MiniLogProps) {
	const { navigate } = useRouteProps();
	return (
		<S.Card>
			{/* TODO: make this look better and work */}
			<button
				onClick={(e) => {
					e.preventDefault();
					navigate(`/logbooks/${log.logbook_id}/log/${log.log_id}`);
				}}
			>
				Open details
			</button>
			<S.Title>{log.name}</S.Title>
			<S.LastUpdated>
				last changed {createDate(log.created_at).fromNow()}
			</S.LastUpdated>
		</S.Card>
	);
}
