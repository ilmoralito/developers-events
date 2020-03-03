import React from "react";

const BookmarkToggleButton = ({
  onToggleBookmarkButton,
  bookmarkButtonBorder,
  isBookmarking
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
    {isBookmarking === null ? " " : isBookmarking ? "+ " : "- "}
    Marcadores
  </button>
);

export default BookmarkToggleButton;
