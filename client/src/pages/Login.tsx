import React from 'react'

const Login = () => {
    const handleLogin = () =>{
        window.location.href = 'http://localhost:3000/auth/google'
    }
  return (
    <button onClick={handleLogin}>
        Login with Google
    </button>
  )
}

export default Login