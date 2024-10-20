import NewActivity from "@/components/NewActivity/NewActivity";
import NewNote from "@/components/NewNote/NewNote";
import TagTree from "@/components/TagTree/TagTree";
import modalIds from "@/lib/modal-ids";
import Modal from "./Modal";
import Notes from "./Notes/Notes";

function Home() {
	return (
		<>
			<Modal initialOpen modalId={modalIds.notes.home}>
				<Notes />
			</Modal>
			<NewNote />
			<NewActivity />

			<TagTree orientation="horizontal" />
		</>
	);
}

export default Home;
