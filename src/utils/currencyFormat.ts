export const currencyFormat = (value: number) => {
  const amount = Math.round(Number.isFinite(value) ? value : 0);
  const grouped = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${amount < 0 ? "-" : ""}$ ${grouped}`;
};
