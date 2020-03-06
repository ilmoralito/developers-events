import React, { useState } from "react";
import { MdDelete, MdCheck, MdCancel } from "react-icons/md";

const Bookmark = ({ id, name, onSelectBookmark, onRemoveBookmark }) => {
  const [confirmRemovalStatus, setConfirmRemovalStatus] = useState(false);

  return (
    <li>
      <div>
        <a
          href="!#"
          onClick={event => {
            event.preventDefault();

            onSelectBookmark(id);
          }}
        >
          {name}
        </a>
      </div>
      {confirmRemovalStatus ? (
        <>
          <button
            style={{ marginRight: "5px" }}
            onClick={() => onRemoveBookmark(id)}
          >
            <MdCheck />
          </button>
          <button onClick={() => setConfirmRemovalStatus(false)}>
            <MdCancel />
          </button>
        </>
      ) : (
        <button onClick={() => setConfirmRemovalStatus(true)}>
          <MdDelete />
        </button>
      )}
    </li>
  );
};

export default Bookmark;
