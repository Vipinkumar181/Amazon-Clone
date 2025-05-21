export const uuid = function() {
  
  const randomNumbers = window.crypto.getRandomValues(
    new Uint8Array(16)
  );
  function convertToHex(num) {
    let hex = num.toString(16);

    if (hex.length === 1) {
      hex = '0' + hex;
    }
    return hex;
  }
  return (
    convertToHex(randomNumbers[0]) +
    convertToHex(randomNumbers[1]) +
    convertToHex(randomNumbers[2]) +
    convertToHex(randomNumbers[3]) +
    '-' +
    convertToHex(randomNumbers[4]) +
    convertToHex(randomNumbers[5]) +
    '-' +
    convertToHex(randomNumbers[6]) +
    convertToHex(randomNumbers[7]) +
    '-' +
    convertToHex(randomNumbers[8]) +
    convertToHex(randomNumbers[9]) +
    '-' +
    convertToHex(randomNumbers[10]) +
    convertToHex(randomNumbers[11]) +
    convertToHex(randomNumbers[12]) +
    convertToHex(randomNumbers[13]) +
    convertToHex(randomNumbers[14]) +
    convertToHex(randomNumbers[15])
  );
};
