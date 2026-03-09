import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login(){

const nav = useNavigate()
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const login = async()=>{
  try{
    const res = await axios.post("http://localhost:5000/api/auth/login",{email,password})
    localStorage.setItem("token",res.data.token)
    nav("/posts")
  }catch(err){
    alert("Login failed")
  }
}

return(
<div className="login-container">

  <div className="login-card">

    <h2>Welcome Back</h2>
    <p className="subtitle">Login to continue</p>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e=>setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e=>setPassword(e.target.value)}
    />

    <button onClick={login}>Login</button>

  </div>

</div>
)
}