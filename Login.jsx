import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./Login.css"

export default function Login(){

const nav = useNavigate()
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const login = async()=>{
  try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_LOGIN_API}`,{email,password})
    localStorage.setItem("token",res.data.token)
    nav("/posts")
  }catch(err){
     toast.error("Login failed.")
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
    <p style={{fontSize:"12px", color:'grey', marginTop:"10px"}}>If you don't have account please </p><span style={{cursor:"pointer", fontSize:"12px", color:'black', marginTop:"10px"}} onClick={()=>nav("./register")}> 👉 Register here.</span>

  </div>

</div>
)
}