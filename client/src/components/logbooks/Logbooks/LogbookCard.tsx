import MiniLog from "@/components/logbooks/Logbooks/MiniLog";
import useLogbookCard from "@/components/logbooks/Logbooks/useLogbookCard";
import type { ID } from "@t/data/utility.types";
import { LucideMaximize, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import S from "./style/LogbookCard.style";

type LogbookCardProps = {
	logbook_id?: ID;
};

export default function LogbookCard({ logbook_id }: LogbookCardProps) {
	const { isProbablySuspended, logbook, logs } = useLogbookCard({
		logbook_id
	});

	if (isProbablySuspended) return null;

	return (
		<S.Card>
			<S.Header>
				<S.Title>{logbook.name}</S.Title>

				<S.Actions>
					<S.LinkButton
						as={Link}
						$color="theme"
						to={`/logbooks/${logbook.logbook_id}`}
					>
						<LucideMaximize size={20} strokeWidth={1.5} />
					</S.LinkButton>
					<S.LinkButton
						as={Link}
						$color="theme"
						to={`/logbooks/${logbook.logbook_id}/log`}
					>
						<SquarePen size={20} strokeWidth={1.5} />
					</S.LinkButton>
				</S.Actions>
			</S.Header>
			{logbook.description && <S.Description>{logbook.description}</S.Description>}

			{logs.length > 0 ? (
				// TODO: drag to scroll if overflowing
				<S.LogList>
					{logs.map((log) => (
						<MiniLog key={log.log_id} log={log} />
					))}
				</S.LogList>
			) : (
				<p>This logbook is empty. </p>
			)}
		</S.Card>
	);
}
