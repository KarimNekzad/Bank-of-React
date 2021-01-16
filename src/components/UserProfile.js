import React, { Component } from "react"

import { Link } from "react-router-dom"

class UserProfile extends Component {
  render() {
    return (
      <div>
        <h1>User Profile</h1>

        <div>Username: {this.props.username}</div>
        <div>Member Since: {this.props.memberSince}</div>

        <Link to="/">Return Home</Link>
      </div>
    )
  }
}

export default UserProfile
