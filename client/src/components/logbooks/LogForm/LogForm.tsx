import F from "@/components/logbooks/LogbookForm/style/LogbookForm.style";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import LogTemplateForm from "@/components/logbooks/LogForm/LogTemplateForm";
import Modal from "@/components/utility/Modal/Modal";
import { useQueryLogTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import useRouteProps from "@/lib/hooks/useRouteProps";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { font } from "@/lib/theme/font";
import type { NewLog } from "@t/data/logbook.new.types";
import { LucideArrowRight, LucideList } from "lucide-react";
import { useState } from "react";

export default function LogForm() {
	const { params } = useRouteProps();
	const { mutate: submit } = useMutateNewLog();
	const logbookId = params.logbookId!; // TODO: do not force non-null assertion
	const { data: logTemplatesData } = useQueryLogTemplatesByLogbook(+(logbookId ?? 0)); // TODO: do not use 0
	const { openModal } = useModalState();
	const [log, setLog] = useState<NewLog>({
		name: "",
		log_template_id: null,
		logbook_id: +logbookId,
		start_time: null,
		end_time: null
	});
	if (!logbookId) return null;
	if (!logTemplatesData) return null;

	const logTemplates = Object.values(logTemplatesData.byId);
	const hasTemplates = !!logTemplates.length;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLog((current) => ({ ...current, [name]: value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit({
			newLog: log
		});
		navigate(wherever);
	}

	return (
		<>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>
					<LucideList size={40} color="royalblue" /> New log
				</F.FormTitle>
				<F.Label>
					<span>name</span>
					<input type="text" name="name" onChange={handleInputChange} />
				</F.Label>

				<div
					style={{
						// outline: "2px solid #ddd",
						// padding: "1rem",
						marginTop: "1rem"
						// borderRadius: "3px"
					}}
				>
					{hasTemplates ? (
						<F.Label>
							<span>template</span>
							<ul
								style={{
									listStyle: "none",
									display: "flex",
									flexDirection: "row",
									maxWidth: "450px",
									flexWrap: "wrap",
									fontSize: font.size["0.8"],
									padding: "0.5rem"
								}}
							>
								{logTemplates.map((template) => (
									<li
										onClick={(e) => {
											e.preventDefault();
											setLog((current) => ({
												...current,
												log_template_id: +template.log_template_id
											}));
										}}
										key={+template.log_template_id}
										style={{
											cursor: "pointer",
											width: "max-content",
											flex: 1,
											alignItems: "center",
											borderRadius: "3px",
											padding: "0.5rem 1rem",
											outline: "2px solid #ddd",

											display: "flex",
											flexDirection: "column",
											backgroundColor:
												log.log_template_id &&
												+template.log_template_id === +log.log_template_id
													? "limegreen"
													: "transparent"
										}}
									>
										{template.name}
										{/* TODO: doing field.toString() because the type is a 
                     NestedPrimitiveObject, but in reality we're currently just 
                     using strings */}
										{/* {template.layout?.map((field) => (
											<div key={field.toString()}>{field.toString()}</div>
										))} */}
									</li>
								))}
							</ul>
						</F.Label>
					) : (
						<>
							There are no templates yet for this logbook. Create one to get
							started.
							<Button
								$iconPosition="right"
								$color="blue"
								style={{
									marginLeft: 0
								}}
								type="button"
								onClick={(e) => {
									e.preventDefault();
									openModal(modalIds.logbooks.logTemplate.form);
								}}
							>
								create a template
							</Button>
						</>
					)}
				</div>

				<F.Submit $iconPosition="right" $color="blue" type="submit">
					create log <LucideArrowRight size={25} />
				</F.Submit>
			</F.Form>
			<Modal modalId={modalIds.logbooks.logTemplate.form}>
				<LogTemplateForm logbook_id={+logbookId} />
			</Modal>
		</>
	);
}
