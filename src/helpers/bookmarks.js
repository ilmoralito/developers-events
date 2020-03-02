const isBookmarked = ({ bookmarks, id }) =>
  bookmarks.map(bookmark => bookmark.id).includes(id);

export { isBookmarked };
