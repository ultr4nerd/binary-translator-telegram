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

  isEmpty(text) {
    let reviewedText = text
    reviewedText = reviewedText.replace(/\x00/g, '')
    return reviewedText === ''
  }
}

module.exports = new TranslatorService()
