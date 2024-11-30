import MiniLog from "@/components/logbooks/Logbooks/MiniLog";
import { logs } from "@/components/logbooks/Logbooks/mock";
import { Action } from "@/lib/theme/components/buttons";
import type { Logbook } from "@t/data/logbook.types";
import { SquarePen } from "lucide-react";
import S from "./style/LogbookCard.style";

type LogbookCardProps = {
	logbook: Logbook;
};

export default function LogbookCard({ logbook }: LogbookCardProps) {
	return (
		<S.Card>
			<S.Title>{logbook.name}</S.Title>
			{logbook.description && <S.Description>{logbook.description}</S.Description>}

			<S.Logs>
				{logs.length > 0 && (
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
