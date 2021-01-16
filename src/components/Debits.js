import React, { Component } from "react"
import axios from "axios"

import DisplayApiDebit from "./DisplayApiDebit"

class Debits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
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

  render() {
    console.log("render debits")
    return (
      <div>
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
