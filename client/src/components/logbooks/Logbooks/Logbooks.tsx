import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import useQueryLogbooks from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { Action, Link as LinkButton } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { LucideFilter, LucideFolderPen } from "lucide-react";
import { Link } from "react-router-dom";
import S from "./style/Logbooks.style";

export default function Logbooks() {
	const { data: logbooksData } = useQueryLogbooks();

	if (!logbooksData) return null;

	const logbooks = [...logbooksData.byId.values()];

	return (
		<div>
			<S.Header>
				<S.Title>Logbooks</S.Title>
				<S.Actions>
					<LinkButton.Icon
						$size={"40px"}
						as={Link}
						$color="theme"
						to="/logbooks/new"
					>
						<LucideFolderPen size={20} strokeWidth={1.5} />
					</LinkButton.Icon>

					{/* filter -- not functional yet */}
					<LinkButton.Icon $size={"40px"} $color="theme" disabled>
						<LucideFilter size={20} strokeWidth={1.5} />
					</LinkButton.Icon>
				</S.Actions>
			</S.Header>

			{/* maybe: you don't have any logbooks yet, create one now! -- text with action button */}
			{logbooks.length === 0 ? (
				<Containers.EmptyState>
					<p>
						You don't have any logbooks yet. Create one to get started. This page
						will look a lot less empty.
					</p>
					<Action.CallToAction $color="yellow" as={Link} to="/logbooks/new">
						<LucideFolderPen />
						Create your first logbook
					</Action.CallToAction>
				</Containers.EmptyState>
			) : (
				<S.LogbookCardList>
					{logbooks.map((logbook) => (
						<LogbookCard key={logbook.logbook_id} logbook_id={logbook.logbook_id} />
					))}
				</S.LogbookCardList>
			)}
		</div>
	);
}
