import React from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
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
        <button type="button" onClick={() => onBookmark(id)}>
          {isBookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
    </li>
  );
};

export default Event;
