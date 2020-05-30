import { makeObservable } from '../vladi-observable-lite/Observable'
import { validateCreditCard } from '../utils/CCUtils'

export enum CreditCardField {
  Number = 'number',
  CVC = 'cvc',
  Expiry = 'expiry',
  Name = 'name',
}

// Like a redux 'store'
class CreditCardObservatory {
  public static initialState = {
    number: '',
    valid: false,
    cvc: '',
    name: '',
    expiry: '',
    focused: 'number',
  }

  public creditCardInfo = makeObservable(CreditCardObservatory.initialState)

  public updateCCNumber(newCcNumber: string) {
    return this.creditCardInfo.update({
      focused: 'number',
      number: newCcNumber,
      valid: validateCreditCard(newCcNumber),
    })
  }

  public updateCVC(cvc: string) {
    return this.creditCardInfo.update({
      cvc,
      focused: 'cvc',
    })
  }

  public updateExpiry(expiry: string) {
    return this.creditCardInfo.update({
      expiry,
      focused: 'expiry',
    })
  }

  public updateName(name: string) {
    return this.creditCardInfo.update({
      name,
      focused: 'name',
    })
  }

  public updateFocus(focused: string) {
    return this.creditCardInfo.update({
      focused,
    })
  }
}

export default new CreditCardObservatory()
