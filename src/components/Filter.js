import React from "react";

function Filter({ filterText, onChange }) {
  return (
    <input
      value={filterText}
      onChange={event => onChange(event.target.value)}
      placeholder="Filtrar..."
    />
  );
}

export default Filter;
