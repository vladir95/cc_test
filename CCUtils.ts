export const valid_credit_card = (ccNumber: string) => {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(ccNumber)) return false

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false
  ccNumber = ccNumber.replace(/\D/g, '')

  for (var n = ccNumber.length - 1; n >= 0; n--) {
    var cDigit = ccNumber.charAt(n),
      nDigit = parseInt(cDigit, 10)

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9

    nCheck += nDigit
    bEven = !bEven
  }

  return nCheck % 10 == 0
}
