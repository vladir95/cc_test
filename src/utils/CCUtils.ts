export const validateCreditCard = (ccNumber: string) => {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(ccNumber)) return false

  let checkSum = 0,
    isEven = false
  ccNumber = ccNumber.replace(/\D/g, '')
  if (ccNumber.length < 16) return false

  for (let n = ccNumber.length - 1; n >= 0; n--) {
    let cDigit = ccNumber.charAt(n),
      digit = parseInt(cDigit, 10)

    if (isEven && (digit *= 2) > 9) digit -= 9

    checkSum += digit
    isEven = !isEven
  }

  return checkSum % 10 === 0
}
