import React from "react"
import Layout from "../components/layout"
import { getTokenCallback } from "../helpers/auth"

class CallbackPage extends React.Component {
  componentDidMount() {
    getTokenCallback((error, tokens) => {
      window.location.href = (!error && tokens) ? '/profile' : '/'
    })
  }

  render() {
    return (
      <Layout>
        <h1>Loading...</h1>
        <p>We're validating your authorization code and you will be redirected momentarily.</p>
      </Layout>
    )
  }
}

export default CallbackPage
