import events from "../data/events.json";
import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

const getCities = () => getData("city");

const getModalities = () => getData("modality");

const getEntrances = () => getData("entrance");

const getTypes = () => getData("type");

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

const getData = property => {
  const results = events.map(event => event[property]);
  const set = new Set(results);

  return [...set];
};

export {
  getCities,
  getModalities,
  getEntrances,
  getTypes,
  getTopics,
  getPeriods
};
