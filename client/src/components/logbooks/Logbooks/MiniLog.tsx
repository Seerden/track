import { createDate } from "@/lib/datetime/make-date";
import type { Log } from "@t/data/logbook.types";
import S from "./style/MiniLog.style";

interface MiniLogProps {
	log: Log;
}

export default function MiniLog({ log }: MiniLogProps) {
	return (
		<S.Card>
			<S.Title>{log.name}</S.Title>
			<S.LastUpdated>
				last changed {createDate(log.created_at).fromNow()}
			</S.LastUpdated>
		</S.Card>
	);
}
