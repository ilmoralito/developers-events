import React from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

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
    {isBookmarking === null ? <MdBookmarkBorder /> : <MdBookmark />}
  </button>
);

export default BookmarkToggleButton;
