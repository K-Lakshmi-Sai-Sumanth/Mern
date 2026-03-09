import { useState } from "react"
import axios from "axios"
import "./Register.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Register(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate();

const register = async()=>{
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_REGISTER_API}`,{name,email,password});
    toast.success("Registered successfully.");
    setName("");
    setEmail("");
    setPassword("");
    navigate("/");
  }catch(err){ 
    toast.error("Registration failed.")
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