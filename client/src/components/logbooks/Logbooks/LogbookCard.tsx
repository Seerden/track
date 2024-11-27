import MiniLog from "@/components/logbooks/Logbooks/MiniLog";
import { Action } from "@/lib/theme/components/buttons";
import type { Log, Logbook } from "@t/data/logbook.types";
import { SquarePen } from "lucide-react";
import S from "./style/LogbookCard.style";

type LogbookCardProps = {
	logbook: Logbook;
};

const logs: Log[] = [
	{
		created_at: new Date(),
		date: new Date(),
		end_time: null,
		start_time: null,
		log_id: 1,
		log_template_id: 1,
		logbook_id: 1,
		name: "Groceries 27/11"
	},
	{
		created_at: new Date(),
		date: new Date(),
		end_time: null,
		start_time: null,
		log_id: 2,
		log_template_id: 2,
		logbook_id: 1,
		name: "Purchases November"
	},
	{
		created_at: new Date(),
		date: new Date(),
		end_time: null,
		start_time: null,
		log_id: 3,
		log_template_id: 3,
		logbook_id: 1,
		name: "Driving lessons"
	}
];

export default function LogbookCard({ logbook }: LogbookCardProps) {
	return (
		<S.Card>
			<S.Title>{logbook.name}</S.Title>
			{logbook.description && <S.Description>{logbook.description}</S.Description>}

			<S.Logs>
				{logs.length && (
					<S.LogList>
						{logs.map((log) => (
							<MiniLog key={log.log_id} log={log} />
						))}
					</S.LogList>
				)}
				<Action.Default
					style={{
						alignSelf: "center",
						borderRadius: "10px",
						width: "65px",
						height: "45px"
					}}
					$color="blue"
				>
					<SquarePen size={22} />
				</Action.Default>
			</S.Logs>
		</S.Card>
	);
}
