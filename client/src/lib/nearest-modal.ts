export function findNearestParentModal(node: Node) {
	let currentNode: Node | null = node;
	while (currentNode) {
		if (currentNode instanceof HTMLElement && currentNode.dataset.modalId) {
			return currentNode.dataset.modalId;
		}
		currentNode = currentNode.parentNode;
	}
	return null;
}
