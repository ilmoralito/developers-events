import React from "react";

const Sort = ({ currentSort, onChangeCurrentSort }) => (
  <div className="sort">
    <button
      onClick={() => onChangeCurrentSort("most recent")}
      style={{
        backgroundColor: currentSort === "most recent" ? "#eeeeee" : "white"
      }}
    >
      Eventos mas recientes
    </button>
    <button
      onClick={() => onChangeCurrentSort("less recent")}
      style={{
        backgroundColor: currentSort === "less recent" ? "#eeeeee" : "white"
      }}
    >
      Eventos menos recientes
    </button>
    <button
      onClick={() => onChangeCurrentSort("most recent publications")}
      style={{
        backgroundColor:
          currentSort === "most recent publications" ? "#eeeeee" : "white"
      }}
    >
      Publicaciones mas recientes
    </button>
    <button
      onClick={() => onChangeCurrentSort("less recent publications")}
      style={{
        backgroundColor:
          currentSort === "less recent publications" ? "#eeeeee" : "white"
      }}
    >
      Publicación menos reciente
    </button>
  </div>
);

export default Sort;
