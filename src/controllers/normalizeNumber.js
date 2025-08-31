function normalizeNumber(number) {
  if (number.startsWith("521")) {
    return "52" + number.slice(3);
  }
  return number;
}

module.exports = normalizeNumber;
