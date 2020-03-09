import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(() =>
    localStorage.isOpen !== undefined ? JSON.parse(localStorage.isOpen) : true
  );

  return (
    <div className="notification">
      <header>
        <h2>Información</h2>
        <button
          onClick={() => {
            const newIsOpenStatus = !isOpen;

            localStorage.setItem("isOpen", newIsOpenStatus);
            setIsOpen(newIsOpenStatus);
          }}
          className="button-icon"
        >
          {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </button>
      </header>

      {isOpen && (
        <main>
          <p>
            Los eventos listados en esta pagina, los he recopilado del grupo{" "}
            <a href="https://www.facebook.com/groups/197973700229538">
              Desarrolladores Nicaragua
            </a>{" "}
            en el que los organizadores publican por si mismo sus eventos. El
            criterios que asumo para listarlos en este sitio son los siguientes:
            <ul>
              <li>Confirmar el organizador y evento</li>
              <li>Ser autorizado por organizador</li>
            </ul>
          </p>
          <p>
            El contacto con el organizador se realiza por email de facilitarlo o
            por mensajes en facebook
          </p>
        </main>
      )}
    </div>
  );
};

export default Notification;
