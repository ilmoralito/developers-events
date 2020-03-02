import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

const translateModality = modality => {
  switch (modality) {
    case "live":
      return "Presencial";
    case "on-line":
      return "En linea";
    default:
      return "Desconocido";
  }
};

const translateEntryPrice = entry => {
  switch (entry) {
    case "free":
      return "Gratuito";
    case "paid":
      return "Pagado";
    default:
      return "Desconocido";
  }
};

const translateEventType = type => {
  switch (type) {
    case "meetup":
      return "Reunión";
    case "workshop":
      return "Taller";
    default:
      return "Desconocido";
  }
};

const translatePeriods = period => {
  switch (period) {
    case TODAY:
      return "Ahora";
    case CURRENT_WEEK:
      return "Esta semana";
    case CURRENT_MONTH:
      return "Este mes";
    default:
      return "Desconocido";
  }
};

export {
  translateModality,
  translateEntryPrice,
  translateEventType,
  translatePeriods
};
