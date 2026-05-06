/** Generates a valid BR Code (PIX Copia e Cola) string for QR code display. */

function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function f(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`;
}

/**
 * Builds a PIX BR Code payload (copia e cola) that banking apps can read.
 * @param key   PIX key (email, CPF, phone or random UUID)
 * @param name  Merchant name (max 25 chars)
 * @param city  City (max 15 chars)
 * @param amount  Payment amount in BRL (optional — omit for open-amount)
 */
export function buildPixPayload(
  key: string,
  name: string,
  city: string,
  amount?: number,
): string {
  const gui        = f('00', 'BR.GOV.BCB.PIX');
  const pixKey     = f('01', key);
  const merchant   = f('26', gui + pixKey);

  const txidSub    = `0503***`;          // sub-field 05, value '***'
  const addlData   = f('62', txidSub);

  let payload =
    f('00', '01') +
    merchant +
    f('52', '0000') +
    f('53', '986') +
    (amount !== undefined ? f('54', amount.toFixed(2)) : '') +
    f('58', 'BR') +
    f('59', name.slice(0, 25)) +
    f('60', city.slice(0, 15)) +
    addlData +
    '6304';

  return payload + crc16(payload);
}

/** Returns the QR code image URL for a PIX payload (uses qrserver.com free API). */
export function pixQrUrl(payload: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(payload)}&bgcolor=05060c&color=7cf2ff&qzone=1`;
}
