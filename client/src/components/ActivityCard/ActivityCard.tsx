import dayjs from "dayjs";
import * as S from "./ActivityCard.style";
import { activity } from "./mock";

const jsxTags = Object.entries(activity.tags).map(([name, value], index) => (
	<S.Tag key={index}>
		<strong>{name}:</strong>
		{value}
	</S.Tag>
));

function ActivityCard() {
	return (
		<S.Card>
			<S.Date>{dayjs(activity.date).fromNow()}</S.Date>
			<S.Title>
				<span>{activity.category}</span>
				<span>{activity.activity}</span>
			</S.Title>
			<S.Field>{activity.description}</S.Field>
			<S.Tags>{jsxTags}</S.Tags>
		</S.Card>
	);
}

export default ActivityCard;
