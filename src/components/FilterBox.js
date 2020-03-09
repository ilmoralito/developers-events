import React from "react";
import {
  getCities,
  getModalities,
  getEntrances,
  getTypes,
  getTopics,
  getPeriods
} from "../helpers/fields";
import {
  translateModality,
  translateEntryPrice,
  translateEventType,
  translatePeriods
} from "../helpers/translations";

const FilterBox = ({
  cities,
  modalities,
  entrances,
  types,
  periods,
  topics,
  onChangeCities,
  onChangeModalities,
  onChangeEntries,
  onChangeTypes,
  onChangePeriods,
  onChangeTopics,
  onResetFilters
}) => {
  const cityList = getCities();
  const modalityList = getModalities();
  const entranceList = getEntrances();
  const typeList = getTypes();
  const topicList = getTopics();
  const periodList = getPeriods();

  const openStatus = hasAnyFilter({
    cities,
    modalities,
    entrances,
    types,
    periods,
    topics
  });

  return (
    <details open={openStatus && "open"}>
      <summary>Filtros{openStatus ? "..." : ""}</summary>
      {openStatus && (
        <button className="reset-filters" onClick={() => onResetFilters()}>
          Resetear filtros
        </button>
      )}
      <div className="filter-box">
        <div>
          <h2>Ciudades</h2>
          <Box
            collectionList={cityList}
            collection={cities}
            onChange={onChangeCities}
          />
        </div>
        <div>
          <h2>Modalidades</h2>
          {modalityList.map(modality => (
            <label key={modality}>
              <input
                type="checkbox"
                value={translateModality(modality)}
                checked={modalities.includes(modality)}
                onChange={() => onChangeModalities(modality)}
              />{" "}
              {translateModality(modality)}
            </label>
          ))}
        </div>
        <div>
          <h2>Entrada</h2>
          {entranceList.map(entrance => (
            <label key={entrance}>
              <input
                type="checkbox"
                value={translateEntryPrice(entrance)}
                checked={entrances.includes(entrance)}
                onChange={() => onChangeEntries(entrance)}
              />{" "}
              {translateEntryPrice(entrance)}
            </label>
          ))}
        </div>
        <div>
          <h2>Tipos</h2>
          {typeList.map(type => (
            <label key={type}>
              <input
                type="checkbox"
                value={translateEventType(type)}
                checked={types.includes(type)}
                onChange={() => onChangeTypes(type)}
              />{" "}
              {translateEventType(type)}
            </label>
          ))}
        </div>
        <div>
          <h2>Periodos</h2>
          {periodList.map(period => (
            <label key={period}>
              <input
                type="checkbox"
                value={period}
                checked={periods.includes(period)}
                onChange={() => onChangePeriods(period)}
              />{" "}
              {translatePeriods(period)}
            </label>
          ))}
        </div>
        <div>
          <h2>Temas</h2>
          <Box
            collectionList={topicList}
            collection={topics}
            onChange={onChangeTopics}
          />
        </div>
      </div>
    </details>
  );
};

const Box = ({ collectionList, collection, onChange }) => (
  <>
    {collectionList.map(element => (
      <label key={element}>
        <input
          type="checkbox"
          value={element}
          checked={collection.includes(element)}
          onChange={() => onChange(element)}
        />{" "}
        {element}
      </label>
    ))}
  </>
);

const hasAnyFilter = ({
  cities,
  modalities,
  entrances,
  types,
  periods,
  topics
}) => {
  return (
    cities.length > 0 ||
    modalities.length > 0 ||
    entrances.length > 0 ||
    types.length > 0 ||
    periods.length > 0 ||
    topics.length > 0
  );
};

export default FilterBox;
