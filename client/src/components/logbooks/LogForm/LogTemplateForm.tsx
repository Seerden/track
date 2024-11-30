import Badge from "@/lib/theme/components/Badge";

export default function LogTemplateForm() {
	const sections = [] as object[];
	const itemTemplates = ["test", "lifts"] as string[];

	return (
		<>
			<h1>Create a log template</h1>

			{itemTemplates.length > 0 && (
				<ul>
					{itemTemplates.map((item) => (
						<Badge key={item}>{item}</Badge>
					))}
				</ul>
			)}

			{sections.length > 0 ? (
				<></>
			) : (
				<>
					<p>You don't have any sections yet. Add a section to get started.</p>
					<button>add section</button>
				</>
			)}
		</>
	);
}
