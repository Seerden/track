import useMutateLogbook from "@/lib/hooks/query/logbooks/useMutateLogbook";
import useMutateNewLogbook from "@/lib/hooks/query/logbooks/useMutateNewLogbook";
import useAuthentication from "@/lib/hooks/useAuthentication";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { NewLogbook } from "@t/data/logbook.new.types";
import type { Logbook } from "@t/data/logbook.types";
import { useState } from "react";

type NewLogbookState = Omit<NewLogbook, "user_id">;

const defaultLogbook: NewLogbookState = {
	description: null,
	name: ""
};

function isLogbook(logbook: Logbook | Omit<NewLogbook, "user_id">): logbook is Logbook {
	return (logbook as Logbook).logbook_id !== undefined;
}

export default function useLogbookForm({
	logbook: existingLogbook
}: {
	logbook?: Logbook;
}) {
	const { navigate } = useRouteProps();
	const { currentUser } = useAuthentication();

	const { mutate: submitNewLogbook } = useMutateNewLogbook();
	const { mutate: submitUpdatedLogbook } = useMutateLogbook();
	const [logbook, setLogbook] = useState<Logbook | NewLogbookState>(
		existingLogbook ?? defaultLogbook
	);

	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setLogbook((current) => ({
			...current,
			[e.target.name]: e.target.value
		}));
	}

	function handleSuccess() {
		navigate("/logbooks");
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!currentUser) return;

		if (!isLogbook(logbook)) {
			const logbookWithUserId: NewLogbook = {
				...logbook,
				user_id: currentUser.user_id
			};
			submitNewLogbook(
				{ newLogbook: logbookWithUserId },
				{
					onSuccess: handleSuccess
				}
			);
		} else {
			submitUpdatedLogbook({ logbook }); // TODO: what do we do on success? Navigating to /logbooks doesn't make sense. Maybe just go back to wherever we were.
		}
	}

	return {
		handleInputChange,
		handleSubmit
	};
}
