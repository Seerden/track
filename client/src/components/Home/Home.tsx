import Today from "@/components/Today/Today";
import { Protected } from "../wrappers";

function Home() {
	return (
		<Protected>
			<Today />
		</Protected>
	);
}

export default Home;
