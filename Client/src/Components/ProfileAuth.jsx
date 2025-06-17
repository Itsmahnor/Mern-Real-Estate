import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SignIn from '../Pages/signIn'

export default function ProfileAuth() {
    const user = useSelector((state) => state.user.User)
  return (
    <div>
      {!user? <SignIn /> : <Outlet />}
    </div>
  )
}
