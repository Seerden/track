import useLogbookForm from "@/components/logbooks/LogbookForm/useLogbookForm";
import F from "@lib/theme/components/form/form.alternate.style";
import type { Logbook } from "@t/data/logbook.types";
import { LucideArrowRight, NotebookPen } from "lucide-react";

type LogbookFormProps = { logbook?: Logbook };

export default function LogbookForm({ logbook }: LogbookFormProps) {
	const { handleInputChange, handleSubmit } = useLogbookForm({ logbook });

	return (
		<F.Form onSubmit={handleSubmit}>
			<F.FormTitle>
				<NotebookPen size={40} fill="white" color="dodgerblue" strokeWidth={2} /> New
				Logbook
			</F.FormTitle>

			<fieldset style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				<F.Label>
					<span>Name</span>
					<input type="text" name="name" required onChange={handleInputChange} />
				</F.Label>

				<F.Label>
					<span>Description (optional)</span>
					<textarea
						rows={3}
						name="description"
						onChange={handleInputChange}
						style={{ height: "100px" }}
					/>
				</F.Label>
			</fieldset>

			<F.Submit type="submit" $color="blue">
				create
				<LucideArrowRight size={20} />
			</F.Submit>
		</F.Form>
	);
}
