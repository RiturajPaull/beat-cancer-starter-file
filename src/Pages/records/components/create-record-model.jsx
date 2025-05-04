import React, { useState } from "react";
import Model from "./Model";
const CreateRecordModel = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    onCreate(folderName);
    setFolderName("");
  };

  return (
    <Model
      title="Create Record"
      isOpen={isOpen}
      onClose={onClose}
      onAction={handleCreate}
      actionLabel="Create Folder"
    >
      <div className="grid gap-y-4">
        <div>
          <label
            htmlFor="folder-name"
            className="mb-2 block text-sm text-white"
          >
            Record Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="foldername"
              id="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              className="disabled:pointer block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </Model>
  );
};
export default CreateRecordModel;
