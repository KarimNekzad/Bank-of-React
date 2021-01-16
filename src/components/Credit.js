import React, { Component } from "react"
import axios from "axios"
import DisplayApiDebit from "./DisplayApiDebit";

class Credit extends Component {

    constructor(props){
        super(props);
        this.state = {
            creditData: []
        }
    };

  async componentDidMount() {
    console.log("comp did mount credit");
    await this.fetchCredit();
  }

  async fetchCredit() {
    const response = await axios.get("https://moj-api.herokuapp.com/credits")
    this.setState({ creditData: response.data });
  }

  render() {
    console.log("render credit")
    return (

      <div>
        <p>Credit</p>
        {this.state.creditData.map((creditData, index) => (

        <DisplayApiDebit
            key={index}
            amount={creditData.amount}
            date={creditData.date}
            description={creditData.description}
            id={creditData.id}
         />
      ))}
    </div>
    )
  }
}

export default Credit
