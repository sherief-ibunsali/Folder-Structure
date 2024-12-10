import { useState } from "react";
import explorer from "./data/jsonData";
import { FolderStructure } from "./component/folderStructure";
import InnerFolderTree from "./innerFolder-tree";

export default function App() {
  const [jsonStructure, setJsonStructure] = useState(explorer);

  const { insertNode, deleteNode } = InnerFolderTree();

  function handleInsertNode(folderId, item, isFolder) {
    const finalTree = insertNode(jsonStructure, folderId, item, isFolder);
    setJsonStructure(finalTree);
  }

  function handleDeleteNode(nodeId) {
    const updatedTree = deleteNode(jsonStructure, nodeId);
    setJsonStructure({ ...updatedTree });
  }

  return (
    <div className="app">
      <FolderStructure
        jsonStructure={jsonStructure}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}
