import React from "react";
import Event from "./Event";
import { isBookmarked } from "../helpers/bookmarks";
import { getToday, isDateInPeriod } from "../helpers/dates";
import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

function Events({
  events,
  filterText,
  currentSort,
  onSelectEvent,
  bookmarks,
  onBookmark,
  cities,
  modalities,
  entrances,
  types,
  periods,
  topics
}) {
  const today = getToday();
  let eventList = events
    .filter(event => {
      const name = event.name.toLowerCase();
      const city = event.city.toLowerCase();
      const type = event.type.toLowerCase();
      const text = filterText.toLowerCase();

      return name.includes(text) || city.includes(text) || type.includes(text);
    })
    .map(event =>
      event.date === today ? { ...event, isNow: true } : { ...event }
    );

  // filter
  eventList = filter({
    eventList,
    cities,
    modalities,
    entrances,
    types,
    periods,
    topics
  });

  // sort
  eventList = sort({ eventList, currentSort });

  return (
    <ul className="events">
      {eventList.length ? (
        <>
          {eventList.map(event => (
            <Event
              key={event.id}
              event={event}
              onSelectEvent={onSelectEvent}
              onBookmark={onBookmark}
              isBookmarked={isBookmarked({ bookmarks, id: event.id })}
            />
          ))}
        </>
      ) : (
        <p>Sin resultados que mostrar</p>
      )}
    </ul>
  );
}

const sort = ({ eventList, currentSort }) => {
  switch (currentSort) {
    case "most recent":
      return eventList.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "less recent":
      return eventList.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "most recent publications":
      return eventList.sort(
        (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
      );
    case "less recent publications":
      return eventList.sort(
        (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
      );
    default:
      return eventList;
  }
};

const filter = ({
  eventList,
  cities,
  modalities,
  entrances,
  types,
  periods,
  topics
}) => {
  let clonedEventList = [...eventList];

  if (cities.length) {
    clonedEventList = clonedEventList.filter(event =>
      cities.includes(event.city)
    );
  }

  if (modalities.length) {
    clonedEventList = clonedEventList.filter(event =>
      modalities.includes(event.modality)
    );
  }

  if (entrances.length) {
    clonedEventList = clonedEventList.filter(event =>
      entrances.includes(event.entrance)
    );
  }

  if (types.length) {
    clonedEventList = clonedEventList.filter(event =>
      types.includes(event.type)
    );
  }

  if (periods.length) {
    periods.forEach(period => {
      if (period === CURRENT_MONTH) {
        clonedEventList = clonedEventList.filter(event =>
          isDateInPeriod({ date: event.date, period: CURRENT_MONTH })
        );
      }

      if (period === CURRENT_WEEK) {
        clonedEventList = clonedEventList.filter(event =>
          isDateInPeriod({ date: event.date, period: CURRENT_WEEK })
        );
      }

      if (period === TODAY) {
        clonedEventList = clonedEventList.filter(event =>
          isDateInPeriod({ date: event.date, period: TODAY })
        );
      }
    });
  }

  if (topics.length) {
    clonedEventList = clonedEventList.filter(event =>
      topics.some(topic => event.topics.includes(topic))
    );

    console.log(clonedEventList);
  }

  return clonedEventList;
};

export default Events;
