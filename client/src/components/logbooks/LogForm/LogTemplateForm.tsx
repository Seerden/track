import useLogTemplateForm from "@/components/logbooks/LogForm/useLogTemplateForm";
import NewItemTemplate from "@/components/logbooks/NewItemTemplate/NewItemTemplate";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { Action } from "@/lib/theme/components/buttons";
import F from "@/lib/theme/components/form/form.alternate.style";
import type { ID } from "@t/data/utility.types";
import {
	LucideArrowRight,
	LucideFolderPlus,
	LucideText,
	LucideUndoDot,
	NotepadText
} from "lucide-react";
import S from "./LogTemplateForm.style";

type LogTemplateFormProps = {
	logbook_id: ID;
};

// TODO: use same styling as LogbookForm
export default function LogTemplateForm({ logbook_id }: LogTemplateFormProps) {
	const {
		showClearSectionsButton,
		sectionCount,
		itemTemplates,
		listElements,
		isSubmittable,
		handleInputChange,
		handleSubmit,
		handleModalOpen
	} = useLogTemplateForm({ logbook_id });

	return (
		<>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>
					<LucideFolderPlus size={40} fill={"white"} color="dodgerblue" /> New log
					template
				</F.FormTitle>

				<fieldset>
					<F.Label>
						<span>Name</span>
						<input type="text" name="name" required onChange={handleInputChange} />
					</F.Label>
				</fieldset>
				<fieldset>
					<S.SelectionList>
						<S.ListDescription>
							Select the sections that you want to include in this log template.
						</S.ListDescription>

						{itemTemplates.length > 0 && !(sectionCount > 0) && (
							<p>
								This template does not have any sections yet. Add a section to get
								started.
							</p>
						)}

						{itemTemplates.length > 0 ? (
							<>
								<S.ActionBar>
									{showClearSectionsButton && (
										<Action.Default
											disabled // TODO: enable when functionality is implemented
											title="Clear all sections"
											$color="red"
											style={{ width: 30, height: 30 }}
										>
											<LucideUndoDot size={20} color="black" />
										</Action.Default>
									)}

									<Action.Default
										disabled // TODO: enable when functionality is implemented
										title="New item template"
										$color="yellow"
										style={{ width: 30, height: 30 }}
									>
										<NotepadText size={20} color="black" />
									</Action.Default>
								</S.ActionBar>

								<>{listElements}</>
							</>
						) : (
							<p>
								You don't have any item templates yet. You need at least one item
								template to get started.
							</p>
						)}
						{/* TODO: this Action.WithIcon is so ugly, and the idea doesn't work either
                  since we don't enforce the usage of an icon. Get rid of it. */}
						<Action.WithIcon $color="blue" onClick={handleModalOpen}>
							New item template <LucideText size={20} />
						</Action.WithIcon>
					</S.SelectionList>
				</fieldset>

				<F.Submit
					// TODO: Submit should have type "submit" by default, so this should be unnecessary
					type="submit"
					$color={!isSubmittable ? "red" : "blue"}
					disabled={!isSubmittable}
				>
					create <LucideArrowRight size={20} />{" "}
				</F.Submit>
			</F.Form>
			<Modal modalId={modalIds.logbooks.itemTemplate.new}>
				<NewItemTemplate logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
