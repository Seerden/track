import LogTemplateForm from "@/components/logbooks/LogForm/LogTemplateForm";
import useLogForm from "@/components/logbooks/LogForm/useLogForm";
import Modal from "@/components/utility/Modal/Modal";
import { Action } from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import F from "@/lib/theme/components/form/form.alternate.style";
import { LucideArrowRight, LucideHelpCircle, LucideList, LucidePlus } from "lucide-react";
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
		isValid,
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
									 * @todo: show a template preview. On desktop, do
									 * this on hover. On mobile, use a trigger button.
									 * Make sure that clicking the trigger doesn't select
									 * the template.
									 * @see TRK-159 */
									<S.TemplateListItem
										tabIndex={0}
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

				{isValid && (
					<F.Submit $color="theme">
						create this log{" "}
						<div
							style={{
								position: "relative",
								display: "flex",
								alignItems: "center"
							}}
						>
							<LucideList size={20} style={{ position: "relative" }} />
							<LucideArrowRight
								size={14}
								style={{
									position: "absolute",
									bottom: 0,
									right: -10,
									backgroundColor: "#eee",
									borderRadius: "50%"
								}}
							/>
						</div>
					</F.Submit>
				)}
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
