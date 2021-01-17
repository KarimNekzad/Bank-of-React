import "./App.css"

import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from "axios"

import Home from "./components/Home"
import UserProfile from "./components/UserProfile"
import LogIn from "./components/Login"
import Debits from "./components/Debits"
import Credit from "./components/Credit"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountBalance: 0.0,
      currentUser: {
        userName: "Bob",
        memberSince: "09/24/00",
      },
      debit: [],
      credit: [],
    }

    this.updateDebitState = this.updateDebitState.bind(this)
    this.updateCreditState = this.updateCreditState.bind(this)
    this.updateBalance = this.updateBalance.bind(this)
  }

  // only occurs once ever on page refresh
  // componentDidMount() {
  //   console.log("App.js mounted")
  // }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  updateDebitState(value) {
    this.setState({ debit: value })
    setTimeout(() => {
      this.updateBalance()
    }, 100)
  }

  updateCreditState(value) {
    this.setState({ credit: value })
    setTimeout(() => {
      this.updateBalance()
    }, 100)
  }

  async fetchDebit() {
    const response = await axios.get("https://moj-api.herokuapp.com/debits")
    this.setState({ debit: response.data })
  }

  async fetchCredit() {
    const response = await axios.get("https://moj-api.herokuapp.com/credits")
    this.setState({ credit: response.data })
  }

  updateBalance() {
    let updatedBalance = 0
    for (let i = 0; i < this.state.debit.length; i++) {
      // parseFloat() forces js to do math instead of appending strings
      updatedBalance += parseFloat(this.state.debit[i].amount)
    }
    console.log("==================")
    for (let i = 0; i < this.state.credit.length; i++) {
      // parseFloat() not necessary for below operation but inclded for clarity
      updatedBalance -= parseFloat(this.state.credit[i].amount)
    }
    this.setState({ accountBalance: updatedBalance })
  }

  async componentDidMount() {
    await this.fetchCredit()
    await this.fetchDebit()
    setTimeout(() => {
      this.updateBalance()
    }, 100)
  }

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    )

    const UserProfileComponent = () => (
      <UserProfile
        username={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    )

    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    )

    const DebitsComponent = () => (
      <Debits
        debit={this.state.debit}
        updateDebitState={this.updateDebitState}
      />
    )

    const CreditComponent = () => (
      <Credit
        credit={this.state.credit}
        updateCreditState={this.updateCreditState}
      />
    )

    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={HomeComponent} /> Must use the render prop becuase passing props to component at router level */}
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          <Route exact path="/credit" render={CreditComponent} />
        </Switch>
      </Router>
    )
  }
}

export default App
