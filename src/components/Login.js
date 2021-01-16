import React, { Component } from "react"
import { Redirect } from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: "",
        password: "",
      },
      redirect: false,
    }
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user }
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({ user: updatedUser })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/userProfile" />
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.user.userName}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default Login
