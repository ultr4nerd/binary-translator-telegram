class TranslatorService {
  textToBinary(text) {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2))
      .join(' ')
  }

  binaryToText(binary) {
    return binary
      .split(' ')
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  }
}

module.exports = new TranslatorService()
