import React, { useEffect } from "react"
import Layout from "../components/layout"
import { getTokenCallback } from "../helpers/auth"

const CallbackPage = () => {
  useEffect(getTokenCallback)

  return (
    <Layout>
      <h1>Loading...</h1>
      <p>We're validating your authorization code and you will be redirected momentarily.</p>
    </Layout>
  )
}

export default CallbackPage
