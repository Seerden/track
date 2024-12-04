import useLogbookForm from "@/components/logbooks/LogbookForm/useLogbookForm";
import type { Logbook } from "@t/data/logbook.types";
import { LucideArrowRight, NotebookPen } from "lucide-react";
import S from "./style/LogbookForm.style";

type LogbookFormProps = { logbook?: Logbook };

export default function LogbookForm({ logbook }: LogbookFormProps) {
	const { handleInputChange, handleSubmit } = useLogbookForm({ logbook });

	return (
		<S.Form onSubmit={(e) => handleSubmit(e)}>
			<S.FormTitle>
				<NotebookPen size={40} fill="white" color="dodgerblue" strokeWidth={2} /> New
				Logbook
			</S.FormTitle>

			<fieldset style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				<S.Label>
					<span>Name</span>
					<input type="text" name="name" required onChange={handleInputChange} />
				</S.Label>

				<S.Label>
					<span>Description (optional)</span>
					<textarea rows={3} name="description" onChange={handleInputChange} />
				</S.Label>
			</fieldset>

			<S.Submit type="submit" $color="blue" $iconPosition="right">
				create
				<LucideArrowRight size={20} />
			</S.Submit>
		</S.Form>
	);
}
