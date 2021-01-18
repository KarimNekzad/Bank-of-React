import React, { Component } from "react"

import { Link } from "react-router-dom"

import DisplayData from "./DisplayData"
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
      viewAddCredit: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
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
      let updatedCredit = [...this.state.credit]
      updatedCredit.push(this.state.temp)
      this.setState({ credit: updatedCredit })
      this.props.updateCreditState(updatedCredit)
    }, 100)
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
    // console.log("render credit")
    // let balance = Number(this.props.accountBalance).toFixed(2)
    // return (
    //   <div>
    //     <Link to="/">Return Home</Link>
    //     <br />
    //     <Link to="/debits">View Debit</Link>
    //     <h3> Add Credit Transaction</h3>

    //     {/* View Balance */}
    //     <div>
    //       <button
    //         onClick={() =>
    //           this.setState({ viewBalance: !this.state.viewBalance })
    //         }
    //       >
    //         View Balance
    //       </button>
    //       {this.state.viewBalance === true ? (
    //         <AccountBalance accountBalance={balance} />
    //       ) : (
    //         // span tag used to display nothing if ternary is false
    //         <span />
    //       )}
    //     </div>

    //     <form onSubmit={this.handleChange}>
    //       <div>
    //         <label>Amount</label>
    //         <input onChange={this.handleChange} type="number" name="amount" />
    //       </div>
    //       <div>
    //         <label>Description</label>
    //         <input
    //           onChange={this.handleChange}
    //           type="text"
    //           name="description"
    //         />
    //       </div>

    //       <button onClick={this.submitForm}>Submit</button>
    //     </form>

    console.log("render credit")
    let balance = Number(this.props.accountBalance).toFixed(2)
    return (
      <div>
        <nav className="debit-credit-nav">
          <Link to="/">Return Home</Link>
          <Link to="/Credit">View Debit</Link>

          {/* Buttons */}
          <button
            onClick={() =>
              this.setState({ viewBalance: !this.state.viewBalance })
            }
          >
            View Balance
          </button>

          <button
            onClick={() => {
              this.setState({ viewAddCredit: !this.state.viewAddCredit })
            }}
          >
            Add Credit
          </button>
        </nav>

        <div>
          {/* Displays */}
          {this.state.viewAddCredit === true ? (
            <div>
              {/* Form */}
              <form onSubmit={this.handleChange}>
                <p>Add Credit Transaction</p>
                <div>
                  <label htmlFor="">Amount</label>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    name="amount"
                  />
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
            </div>
          ) : (
            <span />
          )}

          {this.state.viewBalance === true ? (
            <AccountBalance accountBalance={balance} />
          ) : (
            // span tag used to display nothing if ternary is false
            <span />
          )}
        </div>

        {/* Display Credit */}
        <div className="debit-credit-title">
          <p>Credit</p>
        </div>
        {this.state.credit.map((credit, index) => (
          <DisplayData
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
