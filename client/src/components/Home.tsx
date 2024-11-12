import Modal from "@/components/Modal";
import NewHabit from "@/components/NewHabit/NewHabit";
import modalIds from "@/lib/modal-ids";

function Home() {
	return (
		<>
			<Modal initialOpen modalId={modalIds.habits.new}>
				<NewHabit />
			</Modal>
		</>
	);
}

export default Home;
