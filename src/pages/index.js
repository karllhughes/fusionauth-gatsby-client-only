import React from "react"
import Layout from "../components/layout"
import LoginLink from "../components/login-link"

const IndexPage = () => (
  <Layout>
    <h1>Home</h1>
    <p>
      <LoginLink />
    </p>
  </Layout>
)

export default IndexPage
