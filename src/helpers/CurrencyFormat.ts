export const NumberFormatCOP = (value: number) => {
  const formattedValue = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formattedValue;
};
