import Modal from "./Modal";
import NewNote from "./NewNote/NewNote";
import Notes from "./Notes/Notes";

function Home() {
	return (
		<>
			<Modal initialOpen>
				<Notes />
			</Modal>
			<NewNote />
		</>
	);
}

export default Home;
