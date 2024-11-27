// LogSection represents an item and all of its rows.
// It displays the item name and a list of ItemRowListItems.

export default function LogSection() {
	return (
		<section>
			<h1>{item.name}</h1>
			<ul>
				{item.itemRows.map((itemRow) => (
					<ItemRowListItem key={itemRow.item_row_id} itemRow={itemRow} />
				))}
			</ul>
		</section>
	);
}
