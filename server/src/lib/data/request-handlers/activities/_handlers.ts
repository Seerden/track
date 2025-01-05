import * as DeleteOccurence from "./delete-occurrence";
import * as DeleteRecurrence from "./delete-recurrence";
import * as GetActivities from "./get-activities";
import * as GetOccurrence from "./get-occurrence";
import * as GetRecurrence from "./get-recurrence";
import * as PostActivity from "./post-activity";
import * as PostOccurrence from "./post-occurrence";
import * as PostRecurrence from "./post-recurrence";
import * as PutActivity from "./put-activity";
import * as PutOccurrence from "./put-occurrence";
import * as PutRecurrence from "./put-recurrence";
import * as PutTask from "./put-task";

const GET = {
	...GetActivities,
	...GetOccurrence,
	...GetRecurrence,
};

const POST = {
	...PostActivity,
	...PostOccurrence,
	...PostRecurrence,
};

const PUT = {
	...PutActivity,
	...PutOccurrence,
	...PutRecurrence,
	...PutTask,
};

const DELETE = {
	...DeleteOccurence,
	...DeleteRecurrence,
};

const activityHandlers = {
	GET,
	POST,
	PUT,
	DELETE,
};

export default activityHandlers;
