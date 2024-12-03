import MiniLog from "@/components/logbooks/Logbooks/MiniLog";
import { useQueryLogbookById } from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { useQueryLogsByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogs";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { Action } from "@/lib/theme/components/buttons";
import type { ID } from "@t/data/utility.types";
import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import S from "./style/LogbookCard.style";

type LogbookCardProps = {
	logbook_id?: ID;
};

export default function LogbookCard({ logbook_id }: LogbookCardProps) {
	const { params, navigate } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0));
	const { data: logbook } = useQueryLogbookById(logbookId);
	const { data } = useQueryLogsByLogbook(logbookId);

	console.log({ params, data });

	if (!data || !logbook) return null;

	const logs = Object.values(data.byId);

	return (
		<S.Card>
			<button
				type="button"
				onClick={() => {
					navigate(`/logbooks/${logbook.logbook_id}`);
				}}
			>
				Open logbook
			</button>
			<S.Title>{logbook.name}</S.Title>
			{logbook.description && <S.Description>{logbook.description}</S.Description>}

			<S.Logs>
				{logs.length > 0 ? (
					<S.LogList>
						{logs.map((log) => (
							<MiniLog key={log.log_id} log={log} />
						))}
					</S.LogList>
				) : (
					<p>This logbook is empty. Create your first log.</p>
				)}

				<Link to={`/logbooks/${logbook.logbook_id}/log`}>
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
				</Link>
			</S.Logs>
		</S.Card>
	);
}
