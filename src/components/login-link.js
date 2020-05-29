import React from "react"
import { generateLoginUrl, isAuthenticated } from "../helpers/auth"
import { Link } from "gatsby"

const LoginLink = () =>
  isAuthenticated() ? (
    <Link to={"/profile"}>View your profile</Link>
  ) : (
    <a href={generateLoginUrl()}>Login to get started</a>
  )

export default LoginLink
