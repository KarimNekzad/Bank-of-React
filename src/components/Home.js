import React, { Component } from "react"

import { Link } from "react-router-dom"

import AccountBalance from "./AccountBalance"

import bankIcon from "./images/money.png"

import "./Home.css"

class Home extends Component {
  render() {
    let balance = Number(this.props.accountBalance).toFixed(2)
    return (
      <div className="container">
        <div className="title">
          {/* Be careful of using h1 in header, it has margin so it pushes itself down, cutting off the top */}
          Bank of React
          <p>By: Karim Nekzad, Damir Kamalov, Mohammed J. Hossain</p>
        </div>

        <div className="route-link">
          <Link to="/userProfile">User Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/debits">Debit</Link>
          <Link to="/Credit">Credit</Link>
        </div>

        <img src={bankIcon} alt="Bank Icon" height="380px" />

        <div className="balance">
          <AccountBalance accountBalance={balance} />
        </div>
      </div>
    )
  }
}

export default Home
