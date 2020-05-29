import React from "react"
import Layout from "../components/layout"
import { generateLoginUrl, isAuthenticated } from "../helpers/auth"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <h1>Home</h1>
    <p>
      {isAuthenticated() ? (
        <Link to={"/profile"}>View your profile</Link>
      ) : (
        <a href={generateLoginUrl()}>Login to get started</a>
      )}
    </p>
  </Layout>
)

export default IndexPage
