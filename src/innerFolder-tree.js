export default function InnerFolderTree() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, nodeId) {
    const filteredItems = tree.items.filter((item) => item.id !== nodeId);
    tree.items = filteredItems.map((item) => {
      if (item.isFolder) {
        deleteNode(item, nodeId);
      }
      return item;
    });
    return tree;
  }

  return { insertNode, deleteNode };
}
