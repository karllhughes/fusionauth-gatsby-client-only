import React from "react"
import Layout from "../components/layout"
import {
  generateLoginUrl,
  generateLogoutUrl,
  getCurrentUser,
  isAuthenticated,
} from "../helpers/auth"

class ProfilePage extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    isAuthenticated()
      ? getCurrentUser((error, user) => {
          if (!error && user) {
            this.setState({ user })
          } else {
            window.location.href = generateLoginUrl()
          }
        })
      : (window.location.href = "/")
  }

  logout() {
    localStorage.clear()
    window.location.href = generateLogoutUrl()
  }

  render() {
    return (
      <Layout>
        <h1>Profile</h1>
        {this.state.user ? (
          <p>You are currently logged in as {this.state.user.email}</p>
        ) : (
          ""
        )}
        <p>
          <button onClick={this.logout}>Logout</button>
        </p>
      </Layout>
    )
  }
}

export default ProfilePage
