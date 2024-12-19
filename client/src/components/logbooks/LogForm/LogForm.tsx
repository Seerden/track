import LogTemplateForm from "@/components/logbooks/LogForm/LogTemplateForm";
import useLogForm from "@/components/logbooks/LogForm/useLogForm";
import Modal from "@/components/utility/Modal/Modal";
import { Action } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import F from "@/lib/theme/components/form/form.alternate.style";
import { LucideArrowRight, LucideList, LucidePlus } from "lucide-react";
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
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>
					<LucideList size={40} color="royalblue" /> New log
				</F.FormTitle>

				<S.Fields>
					<F.Label>
						<span>name</span>
						<input type="text" name="name" onChange={handleInputChange} />
					</F.Label>

					{hasTemplates ? (
						<F.Label as="div">
							<span>template</span>
							<S.TemplateList>
								{/* TODO: just copying the templates a bit to see what the styling 
                           does, reset to regular map after playing around */}
								{logTemplates.map((template) => (
									<S.TemplateListItem
										onClick={(e) => handleTemplateClick(e, template)}
										key={+template.log_template_id}
										$selected={
											!!log.log_template_id &&
											+template.log_template_id === +log.log_template_id
										}
									>
										{template.name}
									</S.TemplateListItem>
								))}
								<NewTemplateButton onClick={handleModalOpen} />
							</S.TemplateList>
						</F.Label>
					) : (
						<Containers.EmptyState>
							<p>
								This logbook doesn't have any templates yet. It's easier to get
								going if you start from a template.
							</p>
							<Action.CallToAction $color="yellow">
								<LucidePlus /> Create a log template.
							</Action.CallToAction>
						</Containers.EmptyState>
					)}
				</S.Fields>

				<F.Submit $color="blue" type="submit">
					create log <LucideArrowRight size={25} />
				</F.Submit>
			</F.Form>
			<Modal modalId={modalId}>
				<LogTemplateForm logbook_id={+logbookId} />
			</Modal>
		</S.Wrapper>
	);
}

type NewTemplateButtonProps = {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function NewTemplateButton({ onClick }: NewTemplateButtonProps) {
	return (
		<S.ActionButton onClick={onClick}>
			<LucidePlus strokeWidth={2.5} size={20} />
		</S.ActionButton>
	);
}
