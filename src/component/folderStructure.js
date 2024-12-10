import { useState } from "react";

export function FolderStructure({
  jsonStructure,
  handleInsertNode,
  handleDeleteNode,
}) {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function handleShow() {
    setShow((exp) => !exp);
  }

  function handleNewFolder(e, isFolder) {
    e.stopPropagation();
    setShow(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  }

  function handleCancel() {
    setShowInput({ ...showInput, visible: false });
  }

  function onAddFolder(e) {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(jsonStructure.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  function onDelete(e) {
    e.stopPropagation();
    handleDeleteNode(jsonStructure.id);
  }

  if (jsonStructure.isFolder) {
    return (
      <div className="folder-structure">
        <div onClick={handleShow} className="folder">
          <span className="folder__icon">📁</span>
          <span className="folder__name">{jsonStructure.name}</span>
          <div className="folder__actions">
            <button
              className="folder__button"
              onClick={(e) => handleNewFolder(e, true)}
            >
              New Folder
            </button>
            <button
              className="folder__button"
              onClick={(e) => handleNewFolder(e, false)}
            >
              New File
            </button>
            <button className="folder__button delete-button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
        {show && (
          <div className="folder__content">
            {showInput.visible && (
              <div className="input-container">
                <span>
                  {showInput.isFolder ? "📁" : "📄"}
                  {showInput.isFolder ? "Folder" : "File"} Name:
                </span>
                <input
                  type="text"
                  className="input-container__input"
                  onKeyDown={onAddFolder}
                  autoFocus
                />
                <button
                  className="input-container__cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
            {jsonStructure.items.map((item, i) => (
              <FolderStructure
                key={i}
                jsonStructure={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="file">
        <span className="file__icon">📄</span>
        <span className="file__name">{jsonStructure.name}</span>
        <button className="file__button delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }
}
