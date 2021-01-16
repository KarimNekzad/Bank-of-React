import React, { Component } from "react"

import { Link } from "react-router-dom"

import userIcon from "./images/user.png"

class UserProfile extends Component {
  render() {
    return (
      <div>
        <img src={userIcon} alt="User Profile Icon" />
        <h1>User Profile</h1>

        <div>Username: {this.props.username}</div>
        <div>Member Since: {this.props.memberSince}</div>

        <Link to="/">Return Home</Link>
      </div>
    )
  }
}

export default UserProfile
