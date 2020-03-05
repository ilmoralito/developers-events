import events from "../data/events.json";
import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

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

const getTopics = () => {
  const topics = events
    .map(event => event.topics)
    .reduce((accumulator, current) => {
      return accumulator.concat(current);
    }, []);

  const topicSet = new Set(topics);

  return [...topicSet].sort();
};

const getPeriods = () => {
  return [TODAY, CURRENT_WEEK, CURRENT_MONTH];
};

export {
  getCities,
  getModalities,
  getEntrances,
  getTypes,
  getTopics,
  getPeriods
};
