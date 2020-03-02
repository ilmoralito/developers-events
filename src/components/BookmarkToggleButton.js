import React from "react";

const BookmarkToggleButton = ({
  onToggleBookmarkButton,
  bookmarkButtonBorder
}) => (
  <button
    onClick={() => onToggleBookmarkButton()}
    className="bookmarkToggleButton"
    style={{
      borderLeft: bookmarkButtonBorder,
      borderRight: bookmarkButtonBorder,
      borderBottom: bookmarkButtonBorder
    }}
  >
    Alternar marcadores
  </button>
);

export default BookmarkToggleButton;
