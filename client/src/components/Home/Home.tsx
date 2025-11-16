import Today from "@/components/Today/Today";
import { Protected } from "../wrappers";

/** @deprecated this is never used anywhere */
function Home() {
	return (
		<Protected>
			<Today />
		</Protected>
	);
}

export default Home;
