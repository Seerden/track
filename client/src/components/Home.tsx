import { mockTag } from "./TagCard/mock";
import TagList from "./TagList/TagList";

function Home() {
	return <TagList tags={[mockTag, mockTag]} />;
}

export default Home;
