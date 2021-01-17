import React, { Component } from "react"
import axios from "axios"

import { Link } from "react-router-dom"

import DisplayApiDebit from "./DisplayApiDebit"
import AccountBalance from "./AccountBalance"

class Credit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credit: this.props.credit,
      temp: {
        amount: 0,
        date: "",
        description: "",
        id: "",
      },
      viewBalance: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm() {
    let updatedCredit = [...this.state.credit]
    updatedCredit.push(this.state.temp)
    this.setState({ credit: updatedCredit })
    this.props.updateCreditState(updatedCredit)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      temp: {
        ...this.state.temp,
        [e.target.name]: e.target.value,
      },
    })
  }

  render() {
    console.log("render credit")
    let balance = Number(this.props.accountBalance).toFixed(2)
    return (
      <div>
        <Link to="/">Return Home</Link>
        <br />
        <Link to="/debits">View Debit</Link>
        <h3> Add Credit Transaction</h3>

        {/* View Balance */}
        <div>
          <button
            onClick={() =>
              this.setState({ viewBalance: !this.state.viewBalance })
            }
          >
            View Balance
          </button>
          {this.state.viewBalance === true ? (
            <AccountBalance accountBalance={balance} />
          ) : (
            // span tag used to display nothing if ternary is false
            <span />
          )}
        </div>

        <form onSubmit={this.handleChange}>
          <div>
            <label htmlForm="">Amount</label>
            <input onChange={this.handleChange} type="number" name="amount" />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
            />
          </div>

          <button onClick={this.submitForm}>Submit</button>
        </form>

        <h1>Credit</h1>
        {this.state.credit.map((credit, index) => (
          <DisplayApiDebit
            key={index}
            amount={credit.amount}
            date={credit.date}
            description={credit.description}
            id={credit.id}
          />
        ))}
      </div>
    )
  }
}

export default Credit
