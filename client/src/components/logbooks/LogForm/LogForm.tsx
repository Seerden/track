import LogTemplateForm from "@/components/logbooks/LogForm/LogTemplateForm";
import useLogForm from "@/components/logbooks/LogForm/useLogForm";
import MiniLogTemplate from "@/components/logbooks/MiniLogTemplate/MiniLogTemplate";
import Modal from "@/components/utility/Modal/Modal";
import { Action } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import F from "@/lib/theme/components/form/form.alternate.style";
import type { ID } from "@shared/types/data/utility.types";
import { LucideArrowRight, LucideHelpCircle, LucideList, LucidePlus } from "lucide-react";
import S from "./style/LogForm.style";

type LogFormProps = {
	logbook_id?: ID;
};

export default function LogForm({ logbook_id }: LogFormProps) {
	const {
		isProbablySuspended,
		handleInputChange,
		handleSubmit,
		hasTemplates,
		logTemplates,
		modalId,
		handleModalOpen,
		handleTemplateClick,
		isValid,
		logbookId,
		float,
		activeId,
		setActiveId,
		selectedTemplate
	} = useLogForm({ logbook_id });

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
							<span>layout (optional)</span>
							<S.FieldDescription>
								<S.FieldDescriptionIcon>
									<LucideHelpCircle size={28} />
								</S.FieldDescriptionIcon>
								<S.FieldDescriptionContent>
									Specify the log's layout. You can change this at any time, but
									a template lets you get started quicker.
								</S.FieldDescriptionContent>
							</S.FieldDescription>
							<S.TemplateList>
								{logTemplates.map((template) => (
									/**
									 * @todo: On mobile, use a trigger button to show the
									 * preview. Make sure that clicking the trigger
									 * doesn't select the template.
									 * @see TRK-159 and follow-up issue. */
									<S.TemplateListItem
										tabIndex={0}
										onClick={(e) => handleTemplateClick(e, template)}
										key={+template.log_template_id}
										$selected={
											!!selectedTemplate &&
											+template.log_template_id ===
												+selectedTemplate.log_template_id
										}
										onMouseOver={() => setActiveId(template.log_template_id)}
										ref={(node) =>
											activeId === template.log_template_id
												? float.refs.setReference(node)
												: null
										}
										{...float.getReferenceProps()}
									>
										{template.name}
									</S.TemplateListItem>
								))}
								{activeId && float.open && (
									<div
										ref={float.refs.setFloating}
										style={{
											...float.floatingStyles,
											display: float.open ? "block" : "none",
											marginTop: "0.5rem"
										}}
										{...float.getFloatingProps()}
									>
										<MiniLogTemplate
											log_template_id={activeId}
											logbook_id={logbookId}
										/>
									</div>
								)}
								<NewTemplateButton onClick={handleModalOpen} />
							</S.TemplateList>
						</F.Label>
					) : (
						<Containers.EmptyState>
							<p>
								This logbook doesn't have any templates yet. It's easier to get
								going if you start from a template.
							</p>
							<Action.CallToAction $color="yellow" onClick={handleModalOpen}>
								<LucidePlus /> Create a log template.
							</Action.CallToAction>
						</Containers.EmptyState>
					)}
				</S.Fields>

				{isValid && (
					<F.Submit $color="theme">
						create this log
						<S.IconStack>
							<LucideList size={20} />
							<LucideArrowRight size={14} />
						</S.IconStack>
					</F.Submit>
				)}
			</F.Form>
			<Modal modalId={modalId}>
				<LogTemplateForm logbook_id={logbookId} />
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
