import React, { useEffect } from "react"
import Layout from "../components/layout"
import { getCurrentUser, isAuthenticated } from "../helpers/auth"

const ProfilePage = () => {
  useEffect(getCurrentUser)

  return isAuthenticated() ? (
    <Layout>
      <h1>Profile</h1>
      <p>You are currently logged in.</p>
    </Layout>
  ) : window.location.href = '/'
}

export default ProfilePage
