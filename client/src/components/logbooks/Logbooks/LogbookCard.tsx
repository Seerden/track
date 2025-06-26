import MiniLog from "@/components/logbooks/Logbooks/MiniLog";
import useLogbookCard from "@/components/logbooks/Logbooks/useLogbookCard";
import { Link as LinkButton } from "@/lib/theme/components/buttons";
import type { ID } from "@shared/types/data/utility.types";
import { Link } from "@tanstack/react-router";
import { LucideMaximize, SquarePen } from "lucide-react";
import S from "./style/LogbookCard.style";

type LogbookCardProps = {
	logbook_id?: ID;
};

export default function LogbookCard({ logbook_id }: LogbookCardProps) {
	const { isProbablySuspended, logbook, logs } = useLogbookCard({
		logbook_id
	});

	if (isProbablySuspended || !logbook) return null;

	return (
		<S.Card>
			<S.Header>
				<S.Title>{logbook.name}</S.Title>

				<S.Actions>
					<LinkButton.Icon
						as={Link}
						$size={"28px"}
						$color="theme"
						to={`/logbooks/${logbook.logbook_id}`}
					>
						<LucideMaximize size={20} strokeWidth={1.5} />
					</LinkButton.Icon>
					<LinkButton.Icon
						as={Link}
						$size={"28px"}
						$color="theme"
						to={`/logbooks/${logbook.logbook_id}/log`}
					>
						<SquarePen size={20} strokeWidth={1.5} />
					</LinkButton.Icon>
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
