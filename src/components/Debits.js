import React, { Component } from "react"
import axios from "axios"

import DisplayApiDebit from "./DisplayApiDebit"

class Debits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      temp: {
        amount: "",
        date: "",
        description: "",
        id: "",
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  async componentDidMount() {
    console.log("comp did mount debits")
    await this.fetchDebits()
  }

  async fetchDebits() {
    const response = await axios.get("https://moj-api.herokuapp.com/debits")
    console.log("response", response.data)
    this.setState({ data: response.data })
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
    let updatedData = [...this.state.data]
    updatedData.push(this.state.temp)
    this.setState({ data: updatedData })
  }

  render() {
    console.log("render debits")
    return (
      <div>
        <h3>Add Debit</h3>
        <form onSubmit={this.handleChange}>
          <div>
            <label htmlFor="">Amount</label>
            <input onChange={this.handleChange} type="text" name="amount" />
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

        <h1>Debits</h1>
        {this.state.data.map((data, index) => (
          <DisplayApiDebit
            key={index}
            amount={data.amount}
            date={data.date}
            description={data.description}
            id={data.id}
          />
        ))}
      </div>
    )
  }
}

export default Debits
