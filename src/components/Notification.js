import React, { useState, useEffect } from "react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(localStorage.isOpen ? JSON.parse(localStorage.isOpen) : true);
  }, []);

  return (
    <div className="notification">
      <header>
        <h2>Importante</h2>
        <button
          onClick={() => {
            const newIsOpenStatus = !isOpen;

            localStorage.setItem("isOpen", newIsOpenStatus);
            setIsOpen(newIsOpenStatus);
          }}
        >
          {isOpen ? "Ocultar" : "Mostrar"}
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
