import * as GetFieldTemplates from "./get-field-templates";
import * as GetFields from "./get-fields";
import * as GetItemRows from "./get-item-rows";
import * as GetItemTemplates from "./get-item-templates";
import * as GetItems from "./get-items";
import * as GetLogTemplates from "./get-log-templates";
import * as GetLogbooks from "./get-logbooks";
import * as GetLogs from "./get-logs";

import * as PostItem from "./post-item";
import * as PostItemRow from "./post-item-row";
import * as PostItemTemplate from "./post-item-template";
import * as PostLog from "./post-log";
import * as PostLogTemplate from "./post-log-template";
import * as PostLogbook from "./post-logbook";

import * as PutLog from "./put-log";
import * as PutLogbook from "./put-logbook";

import * as DeleteItem from "./delete-item";
import * as DeleteItemTemplate from "./delete-item-template";
import * as DeleteLog from "./delete-log";
import * as DeleteLogTemplate from "./delete-log-template";
import * as DeleteLogbook from "./delete-logbook";

const GET = {
	...GetFieldTemplates,
	...GetFields,
	...GetItemRows,
	...GetItemTemplates,
	...GetItems,
	...GetLogTemplates,
	...GetLogbooks,
	...GetLogs,
};

const POST = {
	...PostItemRow,
	...PostItemTemplate,
	...PostItem,
	...PostLogTemplate,
	...PostLog,
	...PostLogbook,
};

const PUT = {
	...PutLog,
	...PutLogbook,
};

const DELETE = {
	...DeleteItemTemplate,
	...DeleteItem,
	...DeleteLogTemplate,
	...DeleteLog,
	...DeleteLogbook,
};

const logbookHandlers = {
	GET,
	POST,
	PUT,
	DELETE,
};

export default logbookHandlers;
