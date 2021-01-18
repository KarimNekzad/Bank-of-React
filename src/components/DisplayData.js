import React, { Component } from "react"

import "./DisplayData.css"

class DisplayData extends Component {
  render() {
    console.log("render debits")
    const { amount, date, description, id } = this.props
    return (
      <div className="data-container">
        <div className="display-data">
          <div>
            <p>Amount: ${amount} </p>
          </div>
          <div>
            <p>Date: {date} </p>
          </div>
          <div>
            <p>Description: {description} </p>
          </div>
          <div className="id">
            <p>id: {id} </p>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayData
