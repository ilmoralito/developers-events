import React from "react";
import {
  getCities,
  getModalities,
  getEntrances,
  getTypes,
  getTopics
} from "../helpers/fields";
import {
  translateModality,
  translateEntryPrice,
  translateEventType,
  translatePeriods
} from "../helpers/translations";
import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

const periodList = [TODAY, CURRENT_WEEK, CURRENT_MONTH];

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

  const openStatus = hasAnyFilter({
    cities,
    modalities,
    entrances,
    types,
    periods,
    topics
  })
    ? "open"
    : "";

  return (
    <details open={openStatus}>
      <summary>Filtros</summary>
      {hasAnyFilter({
        cities,
        modalities,
        entrances,
        types,
        periods,
        topics
      }) && (
        <button className="reset-filters" onClick={() => onResetFilters()}>
          Resetear filtros
        </button>
      )}
      <div className="filter-box">
        <div>
          <h2>Ciudades</h2>
          {cityList.map(city => (
            <label key={city}>
              <input
                type="checkbox"
                value={city}
                checked={cities.includes(city)}
                onChange={() => onChangeCities(city)}
              />{" "}
              {city}
            </label>
          ))}
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
          {topicList.map(topic => (
            <label key={topic}>
              <input
                type="checkbox"
                value={topic}
                checked={topics.includes(topic)}
                onChange={() => onChangeTopics(topic)}
              />{" "}
              {topic}
            </label>
          ))}
        </div>
      </div>
    </details>
  );
};

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
