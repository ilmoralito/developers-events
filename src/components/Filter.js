import React from "react";
import PropTypes from "prop-types";

const Filter = ({ filterText, onChange, currentSort, onChangeCurrentSort }) => {
  return (
    <div className="filter">
      <input
        value={filterText}
        onChange={event => onChange(event.target.value)}
        placeholder="Filtrar..."
      />
      <select
        value={currentSort}
        onChange={event => onChangeCurrentSort(event.target.value)}
      >
        <option value={"most recent"}>Eventos mas recientes</option>
        <option value={"less recent"}>Eventos menos recientes</option>
        <option value={"most recent publications"}>
          Publicaciones mas recientes
        </option>
        <option value={"less recent publications"}>
          Publicaciones menos recientes
        </option>
      </select>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  onChangeCurrentSort: PropTypes.func.isRequired
};
