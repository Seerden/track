import TagTree from "@/components/TagTree/TagTree";
import modalIds from "@/lib/modal-ids";
import useTagsTreeQuery from "@/lib/query/use-tags-tree-query";
import Modal from "./Modal";
import NewActivity from "./NewActivity/NewActivity";
import NewNote from "./NewNote/NewNote";
import Notes from "./Notes/Notes";

function Home() {
	const { data } = useTagsTreeQuery();
	console.log({ data });
	return (
		<>
			<Modal initialOpen modalId={modalIds.notes.home}>
				<Notes />
			</Modal>
			<NewNote />
			<NewActivity />

			<TagTree />
		</>
	);
}

export default Home;
