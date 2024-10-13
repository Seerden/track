import { useModalState } from "@/lib/state/modal-state";
import Modal from "./Modal";
import NewActivity from "./NewActivity/NewActivity";
import NewNote from "./NewNote/NewNote";
import Notes from "./Notes/Notes";

function Home() {
	const { state } = useModalState("home-notes");
	return (
		<>
			{state.isOpen && ( // TODO: I do not want to have to do this, but currently it needs to be, because the listeners do not reset properly without it
				<Modal initialOpen modalId={"home-notes"}>
					<Notes />
				</Modal>
			)}
			<NewNote />
			<NewActivity />
		</>
	);
}

export default Home;
