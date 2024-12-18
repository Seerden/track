import useLogForm from "@/components/logbooks/LogForm/useLogForm";
import LogTemplateForm from "@/components/logbooks/LogTemplateForm/LogTemplateForm";
import Modal from "@/components/utility/Modal/Modal";
import { Action } from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form/form.alternate.style";
import { LucideArrowRight, LucideList } from "lucide-react";
import S from "./style/LogForm.style";

export default function LogForm() {
	const {
		isProbablySuspended,
		handleInputChange,
		handleSubmit,
		hasTemplates,
		log,
		logTemplates,
		modalId,
		handleModalOpen,
		handleTemplateClick,
		logbookId
	} = useLogForm();

	if (isProbablySuspended) return null;

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
						marginTop: "1rem"
					}}
				>
					{hasTemplates ? (
						<F.Label>
							<span>template</span>
							<S.TemplateList>
								{logTemplates.map((template) => (
									<S.TemplateListItem
										// TODO: this onClick should be a function, defined
										// in the component hook
										onClick={(e) => handleTemplateClick(e, template)}
										key={+template.log_template_id}
										style={{
											backgroundColor:
												log.log_template_id &&
												+template.log_template_id === +log.log_template_id
													? "limegreen"
													: "transparent"
										}}
									>
										{template.name}
									</S.TemplateListItem>
								))}
							</S.TemplateList>
						</F.Label>
					) : (
						<p>
							There are no templates yet for this logbook. Create one to get
							started.
						</p>
					)}
				</div>

				<NewTemplateButton onClick={handleModalOpen} />

				<F.Submit $color="blue" type="submit">
					create log <LucideArrowRight size={25} />
				</F.Submit>
			</F.Form>
			<Modal modalId={modalId}>
				<LogTemplateForm logbook_id={+logbookId} />
			</Modal>
		</>
	);
}

type NewTemplateButtonProps = {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function NewTemplateButton({ onClick }: NewTemplateButtonProps) {
	return (
		<Action.WithIcon
			$color="blue"
			style={{
				marginLeft: 0
			}}
			onClick={onClick}
		>
			create a template
		</Action.WithIcon>
	);
}
