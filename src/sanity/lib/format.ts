export function formatPrice(price: number, priceUnit?: string) {
  const amount = `€ ${price.toLocaleString("it-IT")}`;
  return priceUnit === "mese" ? `${amount} / mese` : amount;
}

export function statusLabel(status: string) {
  return status === "affitto" ? "Affitto" : "Vendita";
}
