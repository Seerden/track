import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import useQueryLogbooks from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { LucideFilter, LucideFolderPen } from "lucide-react";
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
						<LucideFolderPen size={20} strokeWidth={1.5} />
					</S.LinkButton>

					{/* filter -- not functional yet */}
					<S.LinkButton $color="theme" disabled>
						<LucideFilter size={20} strokeWidth={1.5} />
					</S.LinkButton>
				</S.Actions>
			</S.Header>

			{/* maybe: you don't have any logbooks yet, create one now! -- text with action button */}
			{logbookCount === 0 ? (
				<S.EmptyState>
					<p>
						You don't have any logbooks yet. Create one to get started. This page
						will look a lot less empty.
					</p>
					<S.CallToAction $color="yellow" as={Link} to="/logbooks/new">
						<LucideFolderPen />
						Create your first logbook
					</S.CallToAction>
				</S.EmptyState>
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
