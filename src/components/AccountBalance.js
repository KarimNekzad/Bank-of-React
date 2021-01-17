import React, { Component } from "react"

class AccountBalance extends Component {
  render() {
    return (
      <div>
        <p>Balance: ${this.props.accountBalance}</p>
      </div>
    )
  }
}

export default AccountBalance
