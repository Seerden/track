describe("userOwnsTag", () => {
	// create a mock user
	// create a tag for mock user
	// check if returns true if users match
	// check if returns false if users don't match
});

describe("unlinkParentTag", () => {
	// create a mock user
	// create two mock tags (parent, child) and link them [this should be done in
	// the test suite for insert-tags]
	// unlink the tags
	// check that they are no longer linked
});

describe("updateTag", () => {
	// create a mock user
	// create a tag for mock user
	// case: try to pass another user_id, should fail
	// case: try to pass an unowned tag, should fail
	// case: update a normal field, should return the updated tag
	// case: update a field and a new parent, should update properly
	// case: remove existing parent, should update properly
});
