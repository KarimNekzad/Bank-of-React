import { render } from "@testing-library/react"
import "./App.css"

import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./components/Home"
import UserProfile from "./components/UserProfile"
import LogIn from "./components/Login"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountBalance: 2400.53,
      currentUser: {
        userName: "Bob",
        memberSince: "09/24/00",
      },
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
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

    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={HomeComponent} /> Must use the render prop becuase passing props to component at router leve */}
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
        </Switch>
      </Router>
    )
  }
}

export default App
