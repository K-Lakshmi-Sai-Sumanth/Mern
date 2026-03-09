import { useState } from "react"
import axios from "axios"
import "./Register.css"

export default function Register(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const register = async()=>{
  try{
    await axios.post("http://localhost:5000/api/auth/register",{name,email,password})
    alert("Registered successfully")
  }catch(err){
    alert("Registration failed")
  }
}

return(
<div className="register-container">

  <div className="register-card">

    <h2>Create Account</h2>
    <p className="subtitle">Register to get started</p>

    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={e=>setName(e.target.value)}
    />

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

    <button onClick={register}>Register</button>

  </div>

</div>
)
}