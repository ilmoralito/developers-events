import React from "react";
import Bookmark from "./Bookmark";

function Bookmarks({
  bookmarks,
  onSelectBookmark,
  onRemoveBookmark,
  bookmarksContainerTop
}) {
  return (
    <div className="bookmarks-container" style={{ top: bookmarksContainerTop }}>
      {bookmarks.length ? (
        <div className="bookmark-list">
          <ul>
            {bookmarks.map(bookmark => (
              <Bookmark
                key={bookmark.id}
                id={bookmark.id}
                name={bookmark.name}
                onSelectBookmark={onSelectBookmark}
                onRemoveBookmark={onRemoveBookmark}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ color: "white" }}>Sin bookmarks que mostrar</p>
      )}
    </div>
  );
}

export default Bookmarks;
