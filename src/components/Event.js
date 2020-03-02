import React from "react";
import { getDayAndMonth } from "../helpers/dates";

const Event = ({ event, onSelectEvent, onBookmark, isBookmarked }) => {
  const { id, name, date, isNow } = event;
  const [day, month] = getDayAndMonth(date);

  return (
    <li className={`event ${isNow ? "isNow" : ""}`}>
      <div className="date-box">
        <div>{day}</div>
        <div>{month}</div>
      </div>
      <div>
        <a
          href="!#"
          onClick={event => {
            event.preventDefault();

            onSelectEvent(id);
          }}
        >
          {name}
        </a>
      </div>
      <div>
        <button type="button" onClick={() => onBookmark(id)}>
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </li>
  );
};

export default Event;
