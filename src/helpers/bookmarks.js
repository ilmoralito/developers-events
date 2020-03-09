const getCurrentBookmarks = () =>
  localStorage.bookmarks ? JSON.parse(localStorage.bookmarks) : [];

const getBookmaredEventkById = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.find(bookmark => bookmark.id === id);
};

const isBookmarked = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.map(bookmark => bookmark.id).includes(id);
};

const removeBookmarkById = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.filter(bookmark => bookmark.id !== id);
};

export {
  isBookmarked,
  getBookmaredEventkById,
  removeBookmarkById,
  getCurrentBookmarks
};
