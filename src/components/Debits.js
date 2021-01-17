import React, { Component } from "react"
import axios from "axios"

import { Link } from "react-router-dom"

import DisplayApiDebit from "./DisplayApiDebit"
import AccountBalance from "./AccountBalance"

class Debits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      debit: this.props.debit,
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

  handleChange(e) {
    e.preventDefault()
    this.setState({
      temp: {
        ...this.state.temp,
        [e.target.name]: e.target.value,
      },
    })
  }

  submitForm() {
    let updatedDebit = [...this.state.debit]
    updatedDebit.push(this.state.temp)
    // update local state to map changes
    this.setState({ debit: updatedDebit })
    // update parent state to store changes
    this.props.updateDebitState(updatedDebit)
  }

  render() {
    console.log("render debits")
    return (
      <div>
        <Link to="/">Return Home</Link>
        <br />
        <Link to="/Credit">View Credit</Link>
        <h3>Add Debit</h3>

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
            <AccountBalance accountBalance={this.props.accountBalance} />
          ) : (
            // span tag used to display nothing if ternary is false
            <span />
          )}
        </div>

        {/* Form */}
        <form onSubmit={this.handleChange}>
          <div>
            <label htmlFor="">Amount</label>
            <input onChange={this.handleChange} type="number" name="amount" />
          </div>
          <div>
            <label htmlFor="">Date</label>
            <input onChange={this.handleChange} type="text" name="date" />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
            />
          </div>
          <div>
            <label htmlFor="">Id</label>
            <input onChange={this.handleChange} type="text" name="id" />
          </div>

          <button onClick={this.submitForm}>Submit</button>
        </form>

        {/* Display debit */}
        <h1>Debit</h1>
        {this.state.debit.map((debit, index) => (
          <DisplayApiDebit
            key={index}
            amount={debit.amount}
            date={debit.date}
            description={debit.description}
            id={debit.id}
          />
        ))}
      </div>
    )
  }
}

export default Debits
