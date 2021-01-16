import React, { Component } from "react"
import axios from "axios"
import DisplayApiDebit from "./DisplayApiDebit";

class Credit extends Component {

    constructor(props){
        super(props);
        this.state = {
            creditData: [],
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
    console.log("comp did mount credit");
    await this.fetchCredit();
  }

  async fetchCredit() {
    const response = await axios.get("https://moj-api.herokuapp.com/credits")
    this.setState({ creditData: response.data });
  }

  submitForm() {
    let updatedData = [...this.state.creditData]
    updatedData.push(this.state.temp)
    this.setState({ creditData: updatedData })
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
    console.log("render credit")
    return (
      <div>

        <h3> Add Credit Transaction</h3>
        <form onSubmit={this.handleChange}>

        <div>
          <label htmlForm="">Amount</label>
          <input onChange = {this.handleChange} type="text" name="amount"/>
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
          <label htmlFor="">ID</label>
          <input onChange={this.handleChange} type="text" name="id"/>

          <button onClick={this.submitForm}>Submit</button>
      </form>

        <h1>Credit</h1>
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
