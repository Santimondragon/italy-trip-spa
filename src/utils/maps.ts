export function createGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function createWhatsAppUrl(phone: string, message = ''): string {
  const clean = phone.replace(/\D/g, '');
  const msg = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${clean}${msg}`;
}

export function createPhoneUrl(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}
