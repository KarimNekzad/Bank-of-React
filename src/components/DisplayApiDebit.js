import React, { Component } from "react"

class DisplayApiDebit extends Component {
  render() {
    console.log("render debits")
    const { amount, date, description, id } = this.props
    return (
      <div>
        <p>amount: {amount} </p>
        <p>desctiprion: {date} </p>
        <p>description: {description} </p>
        <p>id: {id} </p>
      </div>
    )
  }
}

export default DisplayApiDebit
