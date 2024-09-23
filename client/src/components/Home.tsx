import Modal from "./Modal";
import NewActivity from "./NewActivity/NewActivity";
import NewNote from "./NewNote/NewNote";
import Notes from "./Notes/Notes";

function Home() {
	return (
		<>
			<Modal initialOpen>
				<Notes />
			</Modal>
			<NewNote />
			<NewActivity />
		</>
	);
}

export default Home;
