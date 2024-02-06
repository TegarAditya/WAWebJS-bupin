const reportPattern = "Saya Menemukan Kode QR yang error berikut kodenya :";

/**
 * The function checks if a given text starts with a specific pattern and returns true if it does,
 * otherwise it returns false.
 * @param {string} text - The `text` parameter is a string that represents a message.
 * @returns a boolean value, either true or false.
 */
function isReportMessage(text) {
    const result = text.startsWith(reportPattern) ? true : false;
    return result;
}

export default isReportMessage;