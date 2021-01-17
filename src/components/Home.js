import React, { Component } from "react"

import { Link } from "react-router-dom"

import AccountBalance from "./AccountBalance"

import bankIcon from "./images/bank.jpg"

class Home extends Component {
  render() {
    let balance = Number(this.props.accountBalance).toFixed(2)
    return (
      <div>
        <img src={bankIcon} alt="Bank Icon" />
        <h1>Bank of React</h1>
        <p>By: Damir Kamalov, Mohammed J. Hossain, Karim Nekzad</p>

        <Link to="/userProfile">User Profile</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/debits">Debit</Link>
        <br />
        <Link to="/Credit">Credit</Link>
        <AccountBalance accountBalance={balance} />
      </div>
    )
  }
}

export default Home
