import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import useQueryLogbooks from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { Action } from "@/lib/theme/components/buttons";
import { LucideFilter, LucideFolderPlus, Notebook } from "lucide-react";
import { Link } from "react-router-dom";
import S from "./style/Logbooks.style";

export default function Logbooks() {
	const { data } = useQueryLogbooks();

	if (!data) return null;

	const logbookCount = Object.values(data.byId).length;

	return (
		<S.Wrapper>
			<S.Header>
				<S.Title>Logbooks</S.Title>
				<S.Actions>
					<S.LinkButton as={Link} $color="theme" to="/logbooks/new">
						<LucideFolderPlus size={20} strokeWidth={1.5} />
					</S.LinkButton>

					{/* filter -- not functional yet */}
					<S.LinkButton $color="theme" disabled>
						<LucideFilter size={20} strokeWidth={1.5} />
					</S.LinkButton>
				</S.Actions>
			</S.Header>

			{/* maybe: you don't have any logbooks yet, create one now! -- text with action button */}
			{!logbookCount ? (
				<div>
					<p>You don't have any logbooks yet, create one now!</p>
					<Action.WithIcon $color="blue">
						<Notebook />
						Create Logbook
					</Action.WithIcon>
				</div>
			) : (
				<S.LogbookCardList>
					{Object.values(data.byId).map((logbook) => (
						<LogbookCard key={logbook.logbook_id} logbook_id={logbook.logbook_id} />
					))}
				</S.LogbookCardList>
			)}
		</S.Wrapper>
	);
}
