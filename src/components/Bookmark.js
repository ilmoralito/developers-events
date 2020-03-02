import React from "react";

const Bookmark = ({ id, name, onSelectBookmark, onRemoveBookmark }) => (
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
    <button onClick={() => onRemoveBookmark(id)}>Eliminar</button>
  </li>
);

export default Bookmark;
