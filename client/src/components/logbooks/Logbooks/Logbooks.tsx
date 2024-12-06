import LogbookCard from "@/components/logbooks/Logbooks/LogbookCard";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import useQueryLogbooks from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logbooks() {
	const { data } = useQueryLogbooks();

	if (!data) return null;

	const logbookCount = Object.values(data.byId).length;

	return (
		// page wrapper
		<div>
			<h1>Logbooks</h1>
			<Link to="/logbooks/new">new logbook</Link>

			{/* maybe: you don't have any logbooks yet, create one now! -- text with action button */}
			{!logbookCount ? (
				<div>
					<p>You don't have any logbooks yet, create one now!</p>
					<Button $color="blue">
						<Notebook />
						Create Logbook
					</Button>
				</div>
			) : (
				<ul>
					{Object.values(data.byId).map((logbook) => (
						<LogbookCard key={logbook.logbook_id} logbook_id={logbook.logbook_id} />
					))}
				</ul>
			)}

			{/* maybe: list of logbooks */}
			{/* logbooks.map(logbook => LogbookCard) */}
			{/* single logbook card */}
		</div>
	);
}
