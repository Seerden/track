`npm run dev` on the client to start the vite dev server.

# Tags
An activity can be part of a group, indicated by the category (and optionally
subcategory) it's in. 

^ doesn't make sense. a tag can have a parent (which would indicate that tag is
a child, or a subcategory, of its parent), but does not have to have one (=
unsorted). an activity can be in multiple categories. 

the idea of a "subcategory" here doesn't make sense, because any category can
already be an arbitrary number of levels deep inside a tree of categories. so we
just work with tags and visually display maybe some information about the tags
(i.e. make a distinction between a top-level tag/category and deeper levels)

I think we do some sort of validation or filtering (client/server, not in
database) that makes sure that if an activity has a tag, it cannot also be
tagged with a child/parent of that tag. or maybe it can, and the user decides.
just make sure we don't get n+1 issues when joining stuff from the database.

---

To simplify things a little bit, a tag can only have one parent. This way we can
get categories with multiple entries, but we avoid the issue of circularity.
Names aren't unique, so users can still create siblings, sort of, by just
searching by name for example. A "purchase" tag that's a child of the "tennis"
category wouldn't be directly related to the "purchase" tag from the "household"
category, but searching by "purchase" would still yield both.