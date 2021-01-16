import React, { Component } from "react"
import axios from "axios"

class Debits extends Component {
  async componentDidMount() {
    console.log("comp did mount debits")
    await this.fetchDebits()
  }

  async fetchDebits() {
    const response = await axios.get("https://moj-api.herokuapp.com/debits")
  }

  render() {
    console.log("render debits")
    return (
      <div>
        <p>Debits</p>
      </div>
    )
  }
}

export default Debits
