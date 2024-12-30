import useMutateNewLog from "@/lib/hooks/query/logbooks/useMutateNewLog";
import { useQueryLogTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import useRouteProps from "@/lib/hooks/useRouteProps";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { NewLog } from "@t/data/logbook.new.types";
import type { LogTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useState } from "react";

export default function useLogForm({ logbook_id }: { logbook_id?: ID }) {
	const { params, navigate } = useRouteProps();
	const { mutate: submit } = useMutateNewLog();
	const float = useFloatingProps({ hover: { restMs: 100 } });
	const [activeId, setActiveId] = useState<ID | null>(null); // id for floating template
	const logbookId = params.logbookId ?? (logbook_id as ID); // TODO: do not cast as ID -- it can actually be undefined
	const { data: logTemplatesData } = useQueryLogTemplatesByLogbook(+(logbookId ?? 0)); // TODO: do not use 0
	const { openModal } = useModalState();
	const [log, setLog] = useState<NewLog>({
		name: "",
		log_template_id: null,
		logbook_id: +logbookId,
		start_time: null,
		end_time: null,
		layout: []
	});

	const isProbablySuspended = !logbookId || !logTemplatesData;

	if (isProbablySuspended) {
		return { isProbablySuspended };
	}

	const logTemplates = Object.values(logTemplatesData.byId);
	const hasTemplates = !!logTemplates.length;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLog((current) => ({ ...current, [name]: value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit(
			{
				newLog: log
			},
			{
				onSuccess: (log) => {
					navigate(`/logbooks/${log.logbook_id}`);
				}
			}
		);
	}

	function handleTemplateClick(
		e: React.MouseEvent<HTMLButtonElement>,
		template: LogTemplate
	) {
		e.preventDefault();
		setLog(
			produce((draft) => {
				if (draft.log_template_id === +template.log_template_id) {
					draft.log_template_id = null;
				} else {
					draft.log_template_id = +template.log_template_id;
				}
			})
		);
	}

	const modalId = modalIds.logbooks.logTemplate.form;

	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalId);
	}

	const isValid = !!log.name && log.name.length > 0;

	return {
		isProbablySuspended,
		handleSubmit,
		handleInputChange,
		hasTemplates,
		logTemplates,
		log,
		logbookId,
		handleModalOpen,
		modalId,
		handleTemplateClick,
		isValid,
		float,
		activeId,
		setActiveId
	};
}
