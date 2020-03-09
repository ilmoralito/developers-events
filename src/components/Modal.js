import React, { useState } from "react";
import {
  MdClose,
  MdShare,
  MdBookmark,
  MdBookmarkBorder,
  MdSend
} from "react-icons/md";
import {
  translateModality,
  translateEntryPrice,
  translateEventType
} from "../helpers/translations";
import Alert from "./Alert";
import { isBookmarked } from "../helpers/bookmarks";

const Modal = ({ event, modalStatus, onToggleModal, onBookmark }) => {
  const [displayShareEventForm, setDisplayShareEventForm] = useState(false);
  const [notifyMailWasSent, setNotifyMailWasSent] = useState(false);

  const formSentHandler = () => {
    setDisplayShareEventForm(false);
    setNotifyMailWasSent(true);

    setTimeout(() => setNotifyMailWasSent(false), 3000);
  };

  const {
    id,
    name,
    date,
    city,
    address,
    description,
    information,
    startTime,
    endTime,
    contact,
    modality,
    entrance,
    type,
    topics,
    publicationDate
  } = event;
  const topicList = topics && topics.join(", ");

  return (
    <div className={`modal ${modalStatus ? "open" : ""}`}>
      <header>
        <p>{name}</p>
        <Control
          id={id}
          displayShareEventForm={displayShareEventForm}
          setDisplayShareEventForm={setDisplayShareEventForm}
          onBookmark={onBookmark}
          onToggleModal={onToggleModal}
        />
      </header>
      <main>
        {notifyMailWasSent && <Alert type="alert">Correo fue enviado</Alert>}
        {displayShareEventForm && (
          <ShareEventForm event={event} onFormSent={formSentHandler} />
        )}
        <table>
          <tbody>
            <tr>
              <td>Fecha</td>
              <td>{date}</td>
            </tr>
            <tr>
              <td>Horario</td>
              <td>
                De {startTime} a {endTime}
              </td>
            </tr>
            {modality === "live" && (
              <>
                <tr>
                  <td>Ciudad</td>
                  <td>{city}</td>
                </tr>
                <tr>
                  <td>Dirección</td>
                  <td>{address}</td>
                </tr>
              </>
            )}
            <tr>
              <td>Mayor información</td>
              <td>
                <a href={information}>{information}</a>
              </td>
            </tr>
            <tr>
              <td>Contacto</td>
              <td>
                <a href={`mailto:${contact}`}>{contact}</a>
              </td>
            </tr>
            <tr>
              <td>Modalidad</td>
              <td>{translateModality(modality)}</td>
            </tr>
            <tr>
              <td>Entrada</td>
              <td>{translateEntryPrice(entrance)}</td>
            </tr>
            <tr>
              <td>Tipo</td>
              <td>{translateEventType(type)}</td>
            </tr>
            <tr>
              <td>Temas</td>
              <td>{topicList}</td>
            </tr>
            <tr>
              <td>Fecha de publicación</td>
              <td>{publicationDate}</td>
            </tr>
            <tr>
              <td colSpan="2">Descripción</td>
            </tr>
            <tr>
              <td colSpan="2">{description}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

const Control = ({
  id,
  displayShareEventForm,
  setDisplayShareEventForm,
  onBookmark,
  onToggleModal
}) => {
  return (
    <div className="control">
      <button
        style={{ background: displayShareEventForm ? "#eeeeee" : "white" }}
        onClick={() => setDisplayShareEventForm(!displayShareEventForm)}
        className="button-icon"
      >
        <MdShare />
      </button>
      <button onClick={() => onBookmark(id)} className="button-icon">
        {isBookmarked(id) ? <MdBookmark /> : <MdBookmarkBorder />}
      </button>
      <button
        type="button"
        onClick={event => {
          event.preventDefault();

          onToggleModal();
        }}
        className="button-icon"
      >
        <MdClose />
      </button>
    </div>
  );
};

const ShareEventForm = ({ event, onFormSent }) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <form
      className="form"
      autoComplete="off"
      noValidate
      onSubmit={e => {
        e.preventDefault();

        const data = { sender, receiver, subject };
        const isValid = validator.validate(data);

        if (isValid !== true) {
          alert(validator.errorsMessage());

          return false;
        }

        data.event = event;

        alert(JSON.stringify(data, null, 4));

        setSender("");
        setReceiver("");
        setSubject("");

        onFormSent();
      }}
    >
      <div className="group">
        <label htmlFor="sender">De</label>
        <input
          name="sender"
          id="sender"
          type="email"
          onChange={event => setSender(event.target.value)}
        />
      </div>

      <div className="group">
        <label htmlFor="receiver">Para</label>
        <input
          name="receiver"
          id="receiver"
          type="email"
          onChange={event => setReceiver(event.target.value)}
        />
      </div>

      <div className="group">
        <label htmlFor="subject">Asunto</label>
        <input
          name="subject"
          id="subject"
          type="text"
          onChange={event => setSubject(event.target.value)}
        />
      </div>

      <div className="group">
        <button className="button-icon">
          <MdSend />
        </button>
      </div>
    </form>
  );
};

const validator = {
  errors: {},

  validate(data) {
    this.errors = {};

    if (!data.sender) {
      this.errors.sender = "Emisor es requerido";
    }

    if (!this.isValidEmail(data.sender)) {
      this.errors.senderEmail = "Email de emisor es invalido";
    }

    if (!data.receiver) {
      this.errors.receiver = "Receptor es requerido";
    }

    if (!this.isValidEmail(data.receiver)) {
      this.errors.receiverEmail = "Email de receptor es invalido";
    }

    if (!data.subject) {
      this.errors.subject = "Asunto es requerido";
    }

    if (!this.isValid()) {
      return this.errors;
    }

    return true;
  },

  errorsMessage() {
    let messages = [];

    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        const message = this.errors[key];

        messages = [...messages, message];
      }
    }

    return messages.join("\n");
  },

  isValid() {
    const keys = Object.keys(this.errors);

    return keys.length === 0;
  },

  isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  }
};

export default Modal;
