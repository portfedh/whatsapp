/**
 * Normalizes a phone number to the standard WhatsApp format for Mexico.
 * If the number starts with '521', it is converted to start with '52'.
 * @param {string} number - The phone number to normalize
 * @returns {string} The normalized phone number
 */
function normalizeNumber(number) {
  if (number.startsWith("521")) {
    return "52" + number.slice(3);
  }
  return number;
}

module.exports = normalizeNumber;
