import { useState } from "react";

const useSort = () => {
  const [currentSort, setCurrentSort] = useState(() =>
    localStorage.currentSort !== undefined
      ? localStorage.currentSort
      : "most recent"
  );

  return [currentSort, setCurrentSort];
};

export default useSort;
