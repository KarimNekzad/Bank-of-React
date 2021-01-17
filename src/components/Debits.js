import React, { Component } from "react"

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
    if (this.state.temp.amount === 0 || this.state.temp.amount === "") {
      alert("Please enter an amount")
      return
    }

    let date = `${new Date()}`
    this.setState({
      temp: {
        ...this.state.temp,
        date: date,
        id: parseInt(Math.random() * (99999 - 10000) + 10000),
      },
    })

    setTimeout(() => {
      let updatedDebit = [...this.state.debit]
      updatedDebit.push(this.state.temp)
      this.setState({ debit: updatedDebit })
      this.props.updateDebitState(updatedDebit)
    }, 100)
  }

  render() {
    console.log("render debits")
    let balance = Number(this.props.accountBalance).toFixed(2)
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
            <AccountBalance accountBalance={balance} />
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
            <label htmlFor="">Description</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
            />
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
