import React from "react"
import Layout from "../components/layout"
import { generateLoginUrl, getCurrentUser, isAuthenticated } from "../helpers/auth"

class ProfilePage extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    isAuthenticated() ?
      getCurrentUser((error, user) => {
        if (!error && user) {
          this.setState({user})
        } else {
          window.location.href = generateLoginUrl()
        }
      }) :
      window.location.href = '/'
  }

  render() {
    return (
      <Layout>
        <h1>Profile</h1>
        {this.state.user ? (<p>You are currently logged in as {this.state.user.email}</p>) : ('') }
      </Layout>
    )
  }
}

export default ProfilePage
