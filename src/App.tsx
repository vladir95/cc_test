/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import './App.css'

import { ObservableProps } from './vladi-observable-lite/helpers'
import { Observer } from './vladi-observable-lite/Observer'

import CreditCardObservatory, {
  CreditCardField,
} from './observatory/CreditCardObservatory'

// It's a class only for the decorator magic :)
@Observer(CreditCardObservatory.creditCardInfo)
class App extends Component<ObservableProps<any>> {
  render() {
    return (
      <div>
        <h1>Credit card validator</h1>
        <Cards
          focused={this.props.observable?.get('focused')}
          cvc={this.props.observable?.get(CreditCardField.CVC)}
          expiry={this.props.observable?.get(CreditCardField.Expiry)}
          name={this.props.observable?.get(CreditCardField.Name)}
          number={this.props.observable?.get(CreditCardField.Number)}
        />
        <form>
          <h3>Please input your credit card information</h3>
          <input
            className="ccInput"
            type="tel"
            name={CreditCardField.Number}
            placeholder="Card Number"
            value={this.props.observable?.get(CreditCardField.Number)}
            onFocus={() =>
              CreditCardObservatory.updateFocus(CreditCardField.Number)
            }
            onChange={(e) =>
              CreditCardObservatory.updateCCNumber(e.target.value)
            }
          />
          {this.props.observable?.get('valid') ? null : (
            <div className="errorText">Card is invalid!</div>
          )}
          <input
            name={CreditCardField.Name}
            placeholder="Name"
            value={this.props.observable?.get(CreditCardField.Name)}
            onFocus={() =>
              CreditCardObservatory.updateFocus(CreditCardField.Name)
            }
            onChange={(e) => CreditCardObservatory.updateName(e.target.value)}
          />
          <input
            name={CreditCardField.Expiry}
            placeholder="Expiry"
            value={this.props.observable?.get(CreditCardField.Expiry)}
            onFocus={() =>
              CreditCardObservatory.updateFocus(CreditCardField.Expiry)
            }
            onChange={(e) => CreditCardObservatory.updateExpiry(e.target.value)}
          />
          <input
            name={CreditCardField.CVC}
            placeholder="CVC"
            value={this.props.observable?.get(CreditCardField.CVC)}
            onFocus={() =>
              CreditCardObservatory.updateFocus(CreditCardField.CVC)
            }
            onChange={(e) => CreditCardObservatory.updateCVC(e.target.value)}
          />
        </form>
        <br />
        <small>⚡️Powered by Vladi-Observable-Lite state management ⚡️</small>
      </div>
    )
  }
}
export default App
