import React, { Component } from "react"
import axios from "axios"

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
        <Credit>
          
        </Credit>
      </div>
    )
  }
}

export default Credit
