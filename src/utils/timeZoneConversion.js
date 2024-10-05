// Opciones para la conversión de la fecha
const dateOptions = {
  timeZone: 'America/Lima',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

// Opciones para la conversión de la hora
const timeOptions = {
  timeZone: 'America/Lima',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export const getFormatedTime = (utcDate) => {
  // Obtener la fecha en formato 'dd/mm/yyyy'
  const peruDate = utcDate.toLocaleDateString('es-PE', dateOptions);

  // Obtener la hora en formato 'HH:mm:ss'
  const peruTime = utcDate.toLocaleTimeString('es-PE', timeOptions);
  return { peruDate, peruTime };
};
