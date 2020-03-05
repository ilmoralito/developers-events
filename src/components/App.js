import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import Bookmarks from "./Bookmarks";
import Events from "./Events";
import Modal from "./Modal";
import BookmarkToggleButton from "./BookmarkToggleButton";
import FilterBox from "./FilterBox";
import Notification from "./Notification";
import eventList from "../data/events.json";
import "./App.css";

function App() {
  const [events] = useState(eventList);
  const [filterText, setFilterText] = useState("");
  const [currentSort, setCurrentSort] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [event, setEvent] = useState({});
  const [bookmarksContainerTop, setBookmarksContainerTop] = useState("-350px");
  const [isBookmarking, setIsBookmarking] = useState(null);
  const [bookmarkButtonBorder, setBookmarkButtonBorder] = useState(
    "1px solid gray"
  );

  // filter status
  const [cities, setCities] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [entrances, setEntrances] = useState([]);
  const [types, setTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setBookmarks(
      localStorage.bookmarks ? JSON.parse(localStorage.bookmarks) : []
    );
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeydown, false);
  }, []);

  useEffect(() => {
    setCurrentSort(
      localStorage.currentSort ? localStorage.currentSort : "most recent"
    );
  }, []);

  useEffect(() => {
    setCities(localStorage.cities ? JSON.parse(localStorage.cities) : []);
    setModalities(
      localStorage.modalities ? JSON.parse(localStorage.modalities) : []
    );
    setEntrances(
      localStorage.entrances ? JSON.parse(localStorage.entrances) : []
    );
    setTypes(localStorage.types ? JSON.parse(localStorage.types) : []);
    setPeriods(localStorage.periods ? JSON.parse(localStorage.periods) : []);
    setTopics(localStorage.topics ? JSON.parse(localStorage.topics) : []);
  }, []);

  const onKeydown = event => {
    if (event.keyCode === 27) {
      setModalStatus(false);
    }
  };

  const changeFilterTextHandler = text => setFilterText(text);

  const changeCurrentSortHandler = sort => {
    setCurrentSort(sort);

    localStorage.setItem("currentSort", sort);
  };

  const bookmarksHandler = id => {
    setTimeout(() => setIsBookmarking(null), 3000);

    if (isBookmarked(id)) {
      const updatedBookmarks = removeBookmarkById(id);

      localStorage.bookmarks = JSON.stringify(updatedBookmarks);
      setBookmarks(updatedBookmarks);
      setIsBookmarking(false);

      return false;
    }

    const currentBookmarks = getCurrentBookmarks();
    const event = events.find(event => event.id === id);
    const updatedBookmarks = [event, ...currentBookmarks];

    localStorage.bookmarks = JSON.stringify(updatedBookmarks);
    setBookmarks(updatedBookmarks);
    setIsBookmarking(true);
  };

  const selectBookmarkHandler = id => {
    const selectedEvent = getBookmaredEventkById(id);

    setEvent(selectedEvent);
    setModalStatus(true);
  };

  const selectEventHandler = id => {
    const selectedEvent = events.find(event => event.id === id);

    setEvent(selectedEvent);
    setModalStatus(true);
  };

  const removeBookmarkHandler = id => {
    const updatedBookmarks = removeBookmarkById(id);

    localStorage.bookmarks = JSON.stringify(updatedBookmarks);
    setBookmarks(updatedBookmarks);
  };

  const toggleModalHandler = () => setModalStatus(!modalStatus);

  const toggleBookmarkButtonHandler = () => {
    const isHidden = bookmarksContainerTop === "-350px";

    setBookmarksContainerTop(isHidden ? 0 : "-350px");
    setBookmarkButtonBorder(isHidden ? "none" : "1px solid gray");
  };

  const changeCitiesHandler = city => {
    if (cities.includes(city)) {
      const clonedCities = [...cities];
      const index = clonedCities.indexOf(city);

      if (index > -1) {
        clonedCities.splice(index, 1);

        setCities(clonedCities);
        localStorage.setItem("cities", JSON.stringify(clonedCities));
      }

      return false;
    }

    setCities([...cities, city]);
    localStorage.setItem("cities", JSON.stringify([...cities, city]));
  };

  const changeModalitiesHandler = modality => {
    if (modalities.includes(modality)) {
      const clonedModalities = [...modalities];
      const index = clonedModalities.indexOf(modality);

      if (index > -1) {
        clonedModalities.splice(index, 1);

        setModalities(clonedModalities);
        localStorage.setItem("modalities", JSON.stringify(clonedModalities));
      }

      return false;
    }

    setModalities([...modalities, modality]);
    localStorage.setItem(
      "modalities",
      JSON.stringify([...modalities, modality])
    );
  };

  const changeEntrancesHandler = entrance => {
    if (entrances.includes(entrance)) {
      const clonedEntrances = [...entrances];
      const index = clonedEntrances.indexOf(entrance);

      if (index > -1) {
        clonedEntrances.splice(index, 1);

        setEntrances(clonedEntrances);
        localStorage.setItem("entrances", JSON.stringify(clonedEntrances));
      }

      return false;
    }

    setEntrances([...entrances, entrance]);
    localStorage.setItem("entrances", JSON.stringify([...entrances, entrance]));
  };

  const changeTypesHandler = type => {
    if (types.includes(type)) {
      const clonedTypes = [...types];
      const index = clonedTypes.indexOf(type);

      if (index > -1) {
        clonedTypes.splice(index, 1);

        setTypes(clonedTypes);
        localStorage.setItem("types", JSON.stringify(clonedTypes));
      }

      return false;
    }

    setTypes([...types, type]);
    localStorage.setItem("types", JSON.stringify([...types, type]));
  };

  const changePeriodsHandler = period => {
    if (periods.includes(period)) {
      const clonedPeriods = [...periods];
      const index = clonedPeriods.indexOf(period);

      if (index > -1) {
        clonedPeriods.splice(index, 1);

        setPeriods(clonedPeriods);
        localStorage.setItem("periods", JSON.stringify(clonedPeriods));
      }

      return false;
    }

    setPeriods([...periods, period]);
    localStorage.setItem("periods", JSON.stringify([...periods, period]));
  };

  const changeTopicsHandler = topic => {
    if (topics.includes(topic)) {
      const clonedTopics = [...topics];
      const index = clonedTopics.indexOf(topic);

      if (index > -1) {
        clonedTopics.splice(index, 1);

        setTopics(clonedTopics);
        localStorage.setItem("topics", JSON.stringify(clonedTopics));
      }

      return false;
    }

    setTopics([...topics, topic]);
    localStorage.setItem("topics", JSON.stringify([...topics, topic]));
  };

  const resetFiltersHandler = () => {
    setCities([]);
    setModalities([]);
    setEntrances([]);
    setTypes([]);
    setPeriods([]);
    setTopics([]);

    localStorage.removeItem("cities");
    localStorage.removeItem("modalities");
    localStorage.removeItem("entrances");
    localStorage.removeItem("types");
    localStorage.removeItem("periods");
    localStorage.removeItem("topics");
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Eventos de informáticos</h1>
      <Bookmarks
        bookmarks={bookmarks}
        onSelectBookmark={selectBookmarkHandler}
        onRemoveBookmark={removeBookmarkHandler}
        bookmarksContainerTop={bookmarksContainerTop}
      />
      <Filter filterText={filterText} onChange={changeFilterTextHandler} />
      <Sort
        currentSort={currentSort}
        onChangeCurrentSort={changeCurrentSortHandler}
      />
      <FilterBox
        cities={cities}
        modalities={modalities}
        entrances={entrances}
        types={types}
        periods={periods}
        topics={topics}
        onChangeCities={changeCitiesHandler}
        onChangeModalities={changeModalitiesHandler}
        onChangeEntries={changeEntrancesHandler}
        onChangeTypes={changeTypesHandler}
        onChangePeriods={changePeriodsHandler}
        onChangeTopics={changeTopicsHandler}
        onResetFilters={resetFiltersHandler}
      />
      <Events
        events={events}
        bookmarks={bookmarks}
        filterText={filterText}
        currentSort={currentSort}
        onBookmark={bookmarksHandler}
        onSelectEvent={selectEventHandler}
        cities={cities}
        modalities={modalities}
        entrances={entrances}
        types={types}
        periods={periods}
        topics={topics}
      />
      <Modal
        event={event}
        modalStatus={modalStatus}
        onToggleModal={toggleModalHandler}
        bookmarks={bookmarks}
        onBookmark={bookmarksHandler}
      />
      <BookmarkToggleButton
        onToggleBookmarkButton={toggleBookmarkButtonHandler}
        bookmarkButtonBorder={bookmarkButtonBorder}
        isBookmarking={isBookmarking}
      />
      <Notification />
    </div>
  );
}

const getCurrentBookmarks = () =>
  localStorage.bookmarks ? JSON.parse(localStorage.bookmarks) : [];

const getBookmaredEventkById = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.find(bookmark => bookmark.id === id);
};

const isBookmarked = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.map(bookmark => bookmark.id).includes(id);
};

const removeBookmarkById = id => {
  const currentBookmarks = getCurrentBookmarks();

  return currentBookmarks.filter(bookmark => bookmark.id !== id);
};

export default App;
