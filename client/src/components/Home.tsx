import Habit from "@/components/habits/DetailedHabit/DetailedHabit";
import { habit } from "@/components/habits/DetailedHabit/mock";

function Home() {
	return <Habit habit={habit} />;
}

export default Home;
