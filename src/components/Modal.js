import React, { Fragment, useState } from "react";
import {
  translateModality,
  translateEntryPrice,
  translateEventType
} from "../helpers/translations";

const Modal = ({ event, modalStatus, onToggleModal }) => {
  const [displayShareEventForm, setDisplayShareEventForm] = useState(false);

  const sendFormHandler = () => setDisplayShareEventForm(false);

  return (
    <div className={`modal ${modalStatus ? "open" : ""}`}>
      <header>
        <p>{event.name}</p>
        <div className="control">
          <button
            onClick={() => setDisplayShareEventForm(!displayShareEventForm)}
          >
            Compartir
          </button>
          <button
            type="button"
            onClick={event => {
              event.preventDefault();

              onToggleModal();
            }}
          >
            Cerrar
          </button>
        </div>
      </header>
      <main>
        {displayShareEventForm && (
          <ShareEventForm event={event} onFormSend={sendFormHandler} />
        )}
        <table>
          <tbody>
            <tr>
              <td>Fecha</td>
              <td>{event.date}</td>
            </tr>
            <tr>
              <td>Horario</td>
              <td>
                De {event.startTime} a {event.endTime}
              </td>
            </tr>
            {event.modality === "live" && (
              <>
                <tr>
                  <td>Ciudad</td>
                  <td>{event.city}</td>
                </tr>
                <tr>
                  <td>Dirección</td>
                  <td>{event.address}</td>
                </tr>
              </>
            )}
            <tr>
              <td>Mayor información</td>
              <td>
                <a href={event.information}>{event.information}</a>
              </td>
            </tr>
            <tr>
              <td>Contacto</td>
              <td>
                <a href={event.contact}>{event.contact}</a>
              </td>
            </tr>
            <tr>
              <td>Modalidad</td>
              <td>{translateModality(event.modality)}</td>
            </tr>
            <tr>
              <td>Entrada</td>
              <td>{translateEntryPrice(event.entrance)}</td>
            </tr>
            <tr>
              <td>Tipo</td>
              <td>{translateEventType(event.type)}</td>
            </tr>
            <tr>
              <td>Fecha de publicación</td>
              <td>{event.publicationDate}</td>
            </tr>
            <tr>
              <td colSpan="2">Descripción</td>
            </tr>
            <tr>
              <td colSpan="2">{event.description}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

const ShareEventForm = ({ event, onFormSend }) => {
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

        onFormSend();
      }}
    >
      <div className="group">
        <label htmlFor="sender">De</label>
        <input
          name="sender"
          id="sender"
          type="email"
          onChange={event => setSender(event.target.value)}
          placeholder="tu@example.com"
        />
      </div>

      <div className="group">
        <label htmlFor="receiver">Para</label>
        <input
          name="receiver"
          id="receiver"
          type="email"
          onChange={event => setReceiver(event.target.value)}
          placeholder="destinatario@example.com"
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
        <button>Enviar</button>
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
