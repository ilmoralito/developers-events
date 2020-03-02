import events from "../data/events.json";

const getCities = () => {
  const allCities = events.map(event => event.city);
  const citiesSet = new Set(allCities);

  return [...citiesSet];
};

const getModalities = () => {
  const allModalities = events.map(event => event.modality);
  const modalitiesSet = new Set(allModalities);

  return [...modalitiesSet];
};

const getEntrances = () => {
  const allEntrances = events.map(event => event.entrance);
  const entrancesSet = new Set(allEntrances);

  return [...entrancesSet];
};

const getTypes = () => {
  const allTypes = events.map(event => event.type);
  const typesSet = new Set(allTypes);

  return [...typesSet];
};

export { getCities, getModalities, getEntrances, getTypes };
