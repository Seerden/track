import modalIds from "@/lib/modal-ids";
import Modal from "./Modal";
import NewActivity from "./NewActivity/NewActivity";
import NewNote from "./NewNote/NewNote";
import Notes from "./Notes/Notes";

function Home() {
	return (
		<>
			<Modal initialOpen modalId={modalIds.notes.home}>
				<Notes />
			</Modal>
			<NewNote />
			<NewActivity />
		</>
	);
}

export default Home;
